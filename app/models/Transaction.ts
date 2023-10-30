export default interface Transaction {
  id: number;
  name: string;
  value: number;
  categoryId: number;
  createdAt: Date;
}