import Realm, { ObjectSchema } from 'realm';

import ICategory from '../interfaces/Category';

export default class Category extends Realm.Object<Category> implements ICategory {
  constructor(
    realm: Realm, 
    public _id: Realm.BSON.UUID,
    public name: string, 
    public iconId: number, 
    public budget: number
  ){
    super(realm, { _id, name, iconId, budget });

    this._id = _id;
    this.name = name;
    this.iconId = iconId;
    this.budget = budget;
  }

  static schema: ObjectSchema = {
    name: 'Category',
    properties: {
      _id: { type: 'uuid', default: () => new Realm.BSON.UUID() },
      name: 'string',
      iconId: 'int',
      budget: 'float'
    },
    primaryKey: '_id'
  }
}