type RootStackParamList = {
  Transactions: undefined;
  Balance: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

export default RootStackParamList;