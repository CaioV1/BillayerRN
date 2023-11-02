import Realm, { ObjectSchema } from 'realm';

import IConfig from '../interfaces/Config';

export default class Config extends Realm.Object<Config> implements IConfig {
  constructor(
    realm: Realm, 
    public _id: Realm.BSON.UUID, 
    public darkTheme: boolean, 
    public dayToRenewBalance: string, 
    public dateToRenewBalance: string
  ){
    super(realm, { _id, darkTheme, dayToRenewBalance, dateToRenewBalance });

    this._id = _id;
    this.darkTheme = darkTheme;
    this.dayToRenewBalance = dayToRenewBalance;
    this.dateToRenewBalance = dateToRenewBalance;
  }

  static schema: ObjectSchema = {
    name: 'Config',
    properties: {
      _id: { type: 'uuid', default: () => new Realm.BSON.UUID() },
      darkTheme: 'bool',
      dayToRenewBalance: 'string',
      dateToRenewBalance:  'string'
    },
    primaryKey: '_id'
  }
}