import Realm, { ObjectSchema } from "realm";

import ITransaction from '../interfaces/Transaction';

export default class Transaction extends Realm.Object<Transaction> implements ITransaction {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  value!: number;
  categoryId!: number;
  createdAt!: Date;

  static schema: ObjectSchema = {
    name: 'Transaction',
    properties: {
      _id: 'objectId',
      name: 'string',
      categoryId: 'float',
      createdAt: 'string'
    },
    primaryKey: '_id'
  }
}