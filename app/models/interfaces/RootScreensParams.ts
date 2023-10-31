type RootStackParamList = {
  Transactions: undefined;
  Balance: undefined;
  CreateTransaction: undefined;
  CreateCategory: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export default RootStackParamList;