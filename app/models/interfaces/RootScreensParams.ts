import Balance from "../schemas/BalanceSchema";

type RootStackParamList = {
  Transactions: undefined;
  Balance: undefined;
  CreateTransaction: undefined;
  CreateCategory: undefined;
  BalanceHistory: undefined;
  DetailCategory: { balance: Balance};
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export default RootStackParamList;