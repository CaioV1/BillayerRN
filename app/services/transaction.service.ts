import Realm from "realm";

import Balance from "../models/schemas/BalanceSchema";
import ITransaction from "../models/interfaces/Transaction";
import Transaction from "../models/schemas/TransactionSchema";

import { getDefaultDateFormat } from "../utils/date.util";

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