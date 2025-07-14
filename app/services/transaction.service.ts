import Realm from "realm";

import IConfig from "../models/interfaces/Config";
import IBalance from "../models/interfaces/Balance";
import ICategory from "../models/interfaces/Category";
import ITransaction from "../models/interfaces/Transaction";

import Config from "../models/schemas/ConfigSchema";
import Balance from "../models/schemas/BalanceSchema";
import Category from "../models/schemas/CategorySchema";
import Transaction from "../models/schemas/TransactionSchema";

import { getDefaultDateFormat, getNextMonthDate, isDateSameOrAfterToday } from "../utils/date.util";
import { fillOutBalancesByCategories } from "./category.service";
import { DEFAULT_CATEGORY_ICONS } from "../resources/values/consts";

export const createTransaction = (realm: Realm, transaction: ITransaction) => {
  const floatValue = parseFloat(transaction.value!.toString().replace(',', '.'));
  const balance = realm.objectForPrimaryKey<Balance>('Balance', transaction.balance._id);

  if(!balance){
    throw new Error('Transaction balance not found');
  }
  
  const newTransaction = realm.write(() => {
    balance!.totalExpenses = balance!.totalExpenses + floatValue;
    return realm.create('Transaction', { 
      name: transaction.name!,
      value: floatValue,
      balance: transaction.balance,
      createdAt: getDefaultDateFormat(new Date())
    })
  });

  return newTransaction;
}

export const updateTransaction = (realm: Realm, oldTransaction: Transaction, newTransaction: ITransaction) => {
  const floatValue = parseFloat(newTransaction.value!.toString().replace(',', '.'));
  const balance = realm.objectForPrimaryKey<Balance>('Balance', newTransaction.balance._id);

  if(!balance){
    throw new Error('Transaction balance not found');
  }

  const updatedTransaction = realm.write(() => {
    if(oldTransaction.balance._id === newTransaction.balance?._id){
      realm.create('Balance', { ...balance, totalExpenses: balance!.totalExpenses + (floatValue - oldTransaction.value) }, true);
    } else {
      realm.create('Balance', { ...oldTransaction.balance, totalExpenses: oldTransaction.balance!.totalExpenses - oldTransaction.value }, true);
      realm.create('Balance', { ...balance, totalExpenses: balance!.totalExpenses + floatValue }, true);
    }

    return realm.create('Transaction', { 
      ...newTransaction, 
      name: newTransaction.name!,
      value: floatValue,
      balance: newTransaction.balance, 
    }, true);
  });

  return updatedTransaction;
}

export const deleteTransaction = (realm: Realm, transaction: Transaction) => {
  realm.write(() => {
    const balance = realm.objectForPrimaryKey<Balance>('Balance', transaction.balance._id);
    balance!.totalExpenses = transaction.balance.totalExpenses - transaction.value;
    realm.delete(transaction);
  });
}

export const importData = (realm: Realm, listTransaction: Array<ITransaction>, setAppConfig: (config: IConfig) => void) => {
  const tempListCategory = listTransaction.reduce((acc, currentValue) => {
    const foundCategory = acc.find(category => category._id === currentValue.balance.category._id);
    if(!foundCategory) acc.push(currentValue.balance.category);
    return acc;
  }, [] as Array<ICategory>);

  const tempListBalance = listTransaction.reduce((acc, currentValue) => {
    const foundBalance = acc.find(balance => balance._id === currentValue.balance._id);
    if(!foundBalance) acc.push(currentValue.balance);
    return acc;
  }, [] as Array<IBalance>);

  let lastDueDate: string = '';

  realm.write(() => {
    tempListCategory.forEach((category) => {
      realm.create(Category.name, {
        ...category,
        iconName: DEFAULT_CATEGORY_ICONS.find(icon => icon.id === category.iconId)!.name,
        _id: new Realm.BSON.UUID(category._id)
      });
    });

    const listCategory = realm.objects<Category>(Category.name);

    tempListBalance.forEach((balance) => {
      const category = listCategory.find(category => category._id == balance.category._id);
      realm.create(Balance.name, {
        ...balance,
        category,
        _id: new Realm.BSON.UUID(balance._id)
      });
    });

    const listBalance = realm.objects<Balance>(Balance.name);

    listTransaction.forEach((transaction) => {
      const balance = listBalance.find(balance => balance._id == transaction.balance._id);
      realm.create(Transaction.name, {
        ...transaction,
        balance,
        _id: new Realm.BSON.UUID(transaction._id)
      });
    });

    lastDueDate = listTransaction[listTransaction.length - 1].balance.dueDate;

    const newAppConfig = realm.create<Config>(Config.name, {
      darkTheme: true,
      dayToRenewBalance: '20',
      dateToRenewBalance: isDateSameOrAfterToday(lastDueDate) ? lastDueDate : getNextMonthDate()
    });

    setAppConfig(newAppConfig);

    if(!isDateSameOrAfterToday(lastDueDate)){
      listCategory.forEach((category) => {
        realm.create(Balance.name, {
          category,
          budget: category.budget,
          totalExpenses: 0,
          dueDate: newAppConfig.dateToRenewBalance,
        });
      });
    }
  });

  fillOutBalancesByCategories(realm, lastDueDate);
}