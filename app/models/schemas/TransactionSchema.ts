import Realm, { ObjectSchema } from "realm";

import Balance from "./BalanceSchema";
import ITransaction from '../interfaces/Transaction';

export default class Transaction extends Realm.Object<Transaction> implements ITransaction {
  constructor(
    realm: Realm, 
    public _id: Realm.BSON.UUID, 
    public name: string, 
    public value: number, 
    public balance: Balance, 
    public createdAt: string
  ){
    super(realm, { _id, name, value, balance, createdAt });

    this._id = _id;
    this.name = name;
    this.value = value;
    this.balance = balance;
    this.createdAt = createdAt;
  }

  static schema: ObjectSchema = {
    name: 'Transaction',
    properties: {
      _id: { type: 'uuid', default: () => new Realm.BSON.UUID() },
      name: 'string',
      value: 'float',
      balance: 'Balance?',
      createdAt: 'string'
    },
    primaryKey: '_id'
  }
}