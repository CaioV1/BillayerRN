import Realm from "realm";
import { Results } from "realm/dist/bundle";

import Balance from "../models/schemas/BalanceSchema";
import ICategory from '../models/interfaces/Category';
import Category from "../models/schemas/CategorySchema";
import Transaction from "../models/schemas/TransactionSchema";

export const createCategory = (realm: Realm, category: ICategory, dateToRenewBalance: string) => {
  const convertedCategory = {
    name: category.name!,
    iconId: parseInt(category.iconId!.toString()),
    budget: parseFloat(category.budget!.toString())
  };

  return realm.write(() => {
    const newCategory = realm.create<Category>('Category', convertedCategory)
    realm.create('Balance', { 
      category: newCategory,
      balance: 0,
      totalExpenses: 0,
      dueDate: dateToRenewBalance
    });

    return newCategory;
  });
}

export const updateCategory = (realm: Realm, oldCategory: Category, newCategory: ICategory) => {
  const updatedCategory = realm.write(() =>
    realm.create<Category>('Category', { 
      name: newCategory.name!,
      iconId: parseInt(newCategory.iconId!.toString()),
      budget: parseFloat(newCategory.budget!.toString()),
      _id: oldCategory._id 
    }, true)
  );

  return updatedCategory;
}

export const deleteCategory = (realm: Realm, balance: Balance, listTransaction: Results<Transaction>) => {
  const category = realm.objectForPrimaryKey<Category>('Category', balance.category._id);
  if(!category) throw new Error('Category not found inside of the balance')

  const transactionsByBalance = listTransaction.filtered('balance.category._id == $0', balance.category._id);

  realm.write(() => {
    transactionsByBalance.forEach((transaction) => {
      realm.delete(transaction);
    });
    realm.delete(balance);
    realm.delete(category);
  });
}