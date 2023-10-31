export default interface Category {
  _id: Realm.BSON.ObjectId;
  name: string;
  iconId: number;
  budget: number;
  totalExpense?: number;
}