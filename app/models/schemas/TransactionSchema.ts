import Realm, { ObjectSchema } from "realm";

import ITransaction from '../interfaces/Transaction';
import Category from "./CategorySchema";

export default class Transaction extends Realm.Object<Transaction> implements ITransaction {
  _id!: Realm.BSON.ObjectId;
  name: string;
  value: number;
  category: Category;
  createdAt: string;

  constructor(realm: Realm, name: string, value: number, category: Category, createdAt: string){
    super(realm, { name, value, category, createdAt });

    this.name = name;
    this.value = value;
    this.category = category;
    this.createdAt = createdAt;
  }

  static schema: ObjectSchema = {
    name: 'Transaction',
    properties: {
      _id: 'objectId',
      name: 'string',
      value: 'float',
      category: 'Category',
      createdAt: 'string'
    },
    primaryKey: '_id'
  }
}