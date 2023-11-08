import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import RootStackParamList from "../../../models/interfaces/RootScreensParams";
import BalanceHistoryItemInterface from "../../../models/interfaces/BalanceHistoryItem";

import useBalance from "../../../hooks/useBalance";

const useBalanceHistory = (navigation: NativeStackNavigationProp<RootStackParamList, 'BalanceHistory'>) => {
  const { formatBalanceList, getBalanceFromData } = useBalance();

  const [listFormattedBalance, setListFormattedBalance] = useState<Array<BalanceHistoryItemInterface>>([]);

  useEffect(() => {
    if(listFormattedBalance.length === 0) setListFormattedBalance(formatBalanceList().reverse());
  }, []);
  
  return {
    listFormattedBalance,
    getBalanceFromData
  }
}

export default useBalanceHistory;