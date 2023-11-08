import { Results } from "realm/dist/bundle";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";

import useBalance from "../../../hooks/useBalance";

import Balance from "../../../models/schemas/BalanceSchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

const useDetailCategory = (route: RouteProp<RootStackParamList, "DetailCategory">) => {
  const { balance } = route.params;
  const { listBalance, getBalanceFromData } = useBalance();

  const [allExpensesResult, setAllExpensesResult] = useState<number>(0);
  const [filteredBalanceList, setFilteredBalanceList] = useState<Results<Balance>>();

  useEffect(() => {
    setFilteredBalanceList(listBalance.filtered('category._id == $0', balance.category._id));
  }, []);

  useEffect(() => {
    filteredBalanceList && setAllExpensesResult(filteredBalanceList.reduce((acc, balance) => acc + balance.totalExpenses, 0))
  }, [filteredBalanceList]);
  
  return {
    balance,
    allExpensesResult,
    filteredBalanceList,
    getBalanceFromData
  }
}

export default useDetailCategory;