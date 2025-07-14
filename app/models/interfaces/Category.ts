import Realm from "realm";

export default interface Category {
  _id?: Realm.BSON.UUID;
  name: string;
  iconId?: number;
  iconName: string;
  budget: number;
}