import Realm, { ObjectSchema } from 'realm';

import IBalance from '../interfaces/Balance';
import Category from './CategorySchema';

export default class Balance extends Realm.Object<Balance> implements IBalance {
  constructor(
    realm: Realm, 
    public _id: Realm.BSON.UUID,
    public category: Category, 
    public balance: number, 
    public totalExpenses: number, 
    public dueDate: string
  ){
    const newId = new Realm.BSON.ObjectID();
    super(realm, { _id, category, balance, totalExpenses });

    this._id = _id;
    this.category = category;
    this.balance = balance;
    this.totalExpenses = totalExpenses;
    this.dueDate = dueDate;
  }

  static schema: ObjectSchema = {
    name: 'Balance',
    properties: {
      _id: { type: 'uuid', default: () => new Realm.BSON.UUID() },
      category: 'Category?',
      balance: 'float',
      totalExpenses: 'float',
      dueDate: 'string'
    },
    primaryKey: '_id'
  }
}