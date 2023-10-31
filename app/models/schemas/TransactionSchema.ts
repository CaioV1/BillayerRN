import Realm, { ObjectSchema } from "realm";

import ITransaction from '../interfaces/Transaction';

export default class Transaction extends Realm.Object<Transaction> implements ITransaction {
  _id!: Realm.BSON.ObjectId;
  name: string;
  value: number;
  categoryId: number;
  createdAt: Date;

  constructor(realm: Realm, name: string, value: number, categoryId: number){
    const newDate = new Date();

    super(realm, { name, value, categoryId, createdAt: newDate });

    this.name = name;
    this.value = value;
    this.categoryId = categoryId;
    this.createdAt = newDate;
  }

  static schema: ObjectSchema = {
    name: 'Transaction',
    properties: {
      _id: 'objectId',
      name: 'string',
      value: 'float',
      categoryId: 'int',
      createdAt: 'string'
    },
    primaryKey: '_id'
  }
}