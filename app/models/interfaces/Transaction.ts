export default interface Transaction {
  _id: Realm.BSON.ObjectId;
  name: string;
  value: number;
  categoryId: number;
  createdAt: Date;
}