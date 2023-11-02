import { useContext, useEffect } from "react";
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
  const listTransaction = useQuery(Transaction);

  useContext(AppConfigContext);

  useEffect(() => {
    console.log('listBalance', listBalance);
    console.log('listCategory', listCategory);
  }, []);

  const getExpensesBalance = (category: ICategory) => {
    const transactionsByCategory = listTransaction.filtered('category._id == $0', category._id);
    const totalExpenses = transactionsByCategory.reduce((acc, transaction) => {
      return acc + transaction.value;
    }, 0);

    return {
      totalExpenses,
      balance: category.budget - totalExpenses
    }
  }

  return {
    listCategory,
    listBalance,
    getExpensesBalance
  }
}

export default useBalance;