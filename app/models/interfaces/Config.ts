import Realm from "realm";

export default interface IConfig {
  _id?: Realm.BSON.UUID;
  darkTheme: boolean;
  dayToRenewBalance: string;
  dateToRenewBalance: string;
}