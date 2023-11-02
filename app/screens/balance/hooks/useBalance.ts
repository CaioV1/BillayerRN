import { useContext, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ICategory from "../../../models/interfaces/Category";
import Category from "../../../models/schemas/CategorySchema";
import Transaction from "../../../models/schemas/TransactionSchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { AppConfigContext } from "../../../context/appConfig.context";
import Balance from "../../../models/schemas/BalanceSchema";

const { useQuery } = RealmContext;

const useBalance = (navigation: NativeStackNavigationProp<RootStackParamList, "Balance">) => {
  const listCategory = useQuery(Category);
  const listBalance = useQuery(Balance);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [allExpensesValue, setAllExpensesValue] = useState<number>(0);

  useContext(AppConfigContext);

  useEffect(() => {
    getAllValues();
  });

  const getAllValues = () => {
    setTotalBudget(listCategory.reduce((acc, category) => acc + category.budget, 0));
    setAllExpensesValue(listBalance.reduce((acc, balance) => acc + balance.totalExpenses, 0));
  }

  return {
    listCategory,
    listBalance,
    totalBudget,
    allExpensesValue,
    getAllValues
  }
}

export default useBalance;