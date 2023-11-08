import { useContext, useEffect } from "react";

import Balance from "../models/schemas/BalanceSchema";
import Category from "../models/schemas/CategorySchema";
import BalanceHistoryItemInterface from "../models/interfaces/BalanceHistoryItem";

import { RealmContext } from "../configs/RealmContext";
import { AppConfigContext } from "../context/appConfig.context";

const { useQuery } = RealmContext;

const useBalance = () => {
  const listCategory = useQuery(Category);
  const listBalance = useQuery(Balance);

  const { appConfig } = useContext(AppConfigContext);

  // useEffect(() => {
  //   console.log('listCategory');
  //   listCategory.forEach((category) => {
  //     console.log(category);
  //   })
  //   console.log('\nlistBalance');
  //   listBalance.forEach((balance) => {
  //     console.log(balance);
  //   })
  // }, [])

  const formatBalanceList = (): Array<BalanceHistoryItemInterface> => {
    const tempList: Array<BalanceHistoryItemInterface> = [];
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

  const getAllCurrentValues = (): { budget: number, totalExpenses: number } => {
    const budget = listCategory.reduce((acc, category) => acc + category.budget, 0);
    const totalExpenses = appConfig?.dateToRenewBalance 
      ? listBalance.filtered('dueDate == $0', appConfig.dateToRenewBalance).reduce((acc, balance) => acc + balance.totalExpenses, 0) 
      : 0;

    return { budget, totalExpenses }
  }

  return {
    listCategory,
    listBalance,
    formatBalanceList,
    getBalanceFromData,
    getAllCurrentValues
  }
}

export default useBalance;