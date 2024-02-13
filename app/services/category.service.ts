import Realm from "realm";
import { Results } from "realm/dist/bundle";

import IBalance from "../models/interfaces/Balance";
import ICategory from '../models/interfaces/Category';
import Balance from "../models/schemas/BalanceSchema";
import Category from "../models/schemas/CategorySchema";
import Transaction from "../models/schemas/TransactionSchema";

export const createCategory = (realm: Realm, category: ICategory, dateToRenewBalance: string) => {
  const convertedCategory = {
    name: category.name!,
    iconId: parseInt(category.iconId!.toString()),
    budget: parseFloat(category.budget!.toString().replace(',', '.'))
  };

  return realm.write(() => {
    const newCategory = realm.create<Category>('Category', convertedCategory)
    realm.create('Balance', { 
      category: newCategory,
      budget: convertedCategory.budget,
      totalExpenses: 0,
      dueDate: dateToRenewBalance
    });

    return newCategory;
  });
}

export const updateCategory = (realm: Realm, oldCategory: Category, newCategory: ICategory, currentBalance: Balance) => {
  const newBudget = parseFloat(newCategory.budget!.toString().replace(',', '.'));

  const updatedCategory = realm.write(() => {
    realm.create<Balance>('Balance', { ...currentBalance, budget: newBudget }, true);
    return realm.create<Category>('Category', { 
      name: newCategory.name!,
      iconId: parseInt(newCategory.iconId!.toString()),
      budget: newBudget,
      _id: oldCategory._id 
    }, true);
  });

  return updatedCategory;
}

export const deleteCategory = (
  realm: Realm, 
  balance: Balance, 
  listTransaction: Results<Transaction>, 
  listBalance: Results<Balance>
) => {
  const category = realm.objectForPrimaryKey<Category>('Category', balance.category._id);
  if(!category) throw new Error('Category not found inside of the balance')

  const balancesByCategoryId = listBalance.filtered('category._id == $0', balance.category._id);
  const transactionsByCategoryId = listTransaction.filtered('balance.category._id == $0', balance.category._id);

  realm.write(() => {
    transactionsByCategoryId.forEach((transaction) => {
      realm.delete(transaction);
    });

    balancesByCategoryId.forEach((balance) => {
      realm.delete(balance);
    });
    
    realm.delete(category);
  });
}

export const fillOutBalancesByCategories = (realm: Realm, dueDate: string) => {
  const listBalance = realm.objects<IBalance>('Balance').filter(balance => balance.dueDate === dueDate);
  const listCategory = realm.objects<ICategory>('Category');

  listCategory.forEach(category => {
    const balance = listBalance.find((balance) => category._id!.toString() === balance.category._id.toString());
    if(!balance) realm.write(() => {
      realm.create(Balance.name, {
        category,
        totalExpenses: 0,
        dueDate: dueDate,
        budget: category.budget,
        _id: new Realm.BSON.UUID(),
      })
    })
  });
}