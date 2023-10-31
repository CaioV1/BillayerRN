import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';

import ICategory from '../interfaces/Category';

export default class Category extends Realm.Object<Category> implements ICategory {
  _id!: ObjectId;
  name: string;
  iconId: number;
  budget: number;
  totalExpense?: number;

  constructor(realm: Realm, name: string, iconId: number, budget: number, totalExpense?: number){
    super(realm, { name, iconId, budget, totalExpense });

    this.name = name;
    this.iconId = iconId;
    this.budget = budget;
    this.totalExpense = totalExpense;
  }

  static schema: ObjectSchema = {
    name: 'Category',
    properties: {
      _id: 'objectId',
      name: 'string',
      iconId: 'int',
      budget: 'float',
      totalExpense: {
        type: 'float',
        optional: true
      }
    },
    primaryKey: '_id'
  }
}