import Realm from "realm";
import Category from "../schemas/CategorySchema";

export default interface IBalance {
  _id: Realm.BSON.UUID;
  category: Category;
  balance: number;
  totalExpenses: number;
  dueDate: string;
}