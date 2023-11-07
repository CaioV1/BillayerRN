import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Balance from "../../../models/schemas/BalanceSchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";

const { useQuery } = RealmContext;

interface BalanceHistoryItemInterface {
  title: string;
  data: Array<Balance>;
}

const useBalanceHistory = (navigation: NativeStackNavigationProp<RootStackParamList, 'BalanceHistory'>) => {
  const listBalance = useQuery(Balance);

  const [listFormattedBalance, setListFormattedBalance] = useState<Array<BalanceHistoryItemInterface>>([]);

  useEffect(() => {
    if(listFormattedBalance.length === 0) setListFormattedBalance(formatBalanceList().reverse());
  }, []);

  const formatBalanceList = () => {
    const tempList = [...listFormattedBalance];
    return listBalance.reduce((acc, balance) => {
      const balanceFound = acc.find((item) => item.title === balance.dueDate);
      if(balanceFound) {
        acc.map((item) => {
          if(item.title === balance.dueDate) item.data.push(balance);
          return item;
        })
      } else {
        acc.push({ title: balance.dueDate, data: [balance] });
      }

      return acc;
    }, tempList)
  }

  const getBalanceFromData = (data: Array<Balance>): number => {
    const allExpenses = data.reduce((acc, balance) => acc + balance.totalExpenses, 0);
    const totalBudget = data.reduce((acc, balance) => acc + balance.category.budget, 0);
    return totalBudget - allExpenses;
  }
  
  return {
    listFormattedBalance,
    getBalanceFromData
  }
}

export default useBalanceHistory;