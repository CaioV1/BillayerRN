import Balance from "../schemas/BalanceSchema";
import Category from "../schemas/CategorySchema";
import Transaction from "../schemas/TransactionSchema";

type RootStackParamList = {
  Transactions: undefined;
  Balance: undefined;
  CreateTransaction: { transaction?: Transaction };
  CreateCategory: { category?: Category };
  BalanceHistory: undefined;
  DetailCategory: { balance: Balance};
  DetailTransaction: { transaction: Transaction };
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export default RootStackParamList;