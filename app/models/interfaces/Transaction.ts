import Category from "../schemas/CategorySchema";

export default interface Transaction {
  _id: Realm.BSON.ObjectId;
  name: string;
  value: number;
  category: Category;
  createdAt: string;
}