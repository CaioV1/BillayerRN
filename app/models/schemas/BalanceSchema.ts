import Realm, { ObjectSchema } from 'realm';

import IBalance from '../interfaces/Balance';
import Category from './CategorySchema';

export default class Balance extends Realm.Object<IBalance> implements IBalance {
  constructor(
    realm: Realm, 
    public category: Category, 
    public budget: number, 
    public totalExpenses: number, 
    public dueDate: string,
    public _id?: Realm.BSON.UUID,
  ){
    super(realm, { _id, category, budget, totalExpenses });

    this.category = category;
    this.budget = budget;
    this.totalExpenses = totalExpenses;
    this.dueDate = dueDate;
  }

  static schema: ObjectSchema = {
    name: 'Balance',
    properties: {
      _id: { type: 'uuid', default: () => new Realm.BSON.UUID() },
      category: 'Category?',
      budget: 'double',
      totalExpenses: 'double',
      dueDate: 'string'
    },
    primaryKey: '_id'
  }
}