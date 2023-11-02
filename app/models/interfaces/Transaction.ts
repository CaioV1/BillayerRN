import Realm from "realm";
import Balance from "../schemas/BalanceSchema";

export default interface Transaction {
  _id: Realm.BSON.UUID;
  name: string;
  value: number;
  balance: Balance;
  createdAt: string;
}