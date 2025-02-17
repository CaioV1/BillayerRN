import Balance from "../schemas/BalanceSchema";
import Category from "../schemas/CategorySchema";
import Transaction from "../schemas/TransactionSchema";

type RootStackParamList = {
  Transactions: undefined;
  Balance: undefined;
  CreateTransaction: { transaction?: Transaction, balance?: Balance };
  CreateCategory: { category?: Category };
  BalanceHistory: undefined;
  DetailCategory: { balance: Balance};
  DetailTransaction: { transaction: Transaction };
  SearchTransaction: undefined;
  FilterTransaction: undefined;
};

export default RootStackParamList;