import Balance from "../schemas/BalanceSchema";
import Category from "../schemas/CategorySchema";

type RootStackParamList = {
  Transactions: undefined;
  Balance: undefined;
  CreateTransaction: undefined;
  CreateCategory: { category?: Category };
  BalanceHistory: undefined;
  DetailCategory: { balance: Balance};
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export default RootStackParamList;