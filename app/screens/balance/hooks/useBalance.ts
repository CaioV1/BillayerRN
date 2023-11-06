import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Balance from "../../../models/schemas/BalanceSchema";
import Category from "../../../models/schemas/CategorySchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { getNextMonthDate } from "../../../utils/date.util";
import { RealmContext } from "../../../configs/RealmContext";
import { AppConfigContext } from "../../../context/appConfig.context";

const { useQuery } = RealmContext;

const useBalance = (navigation: NativeStackNavigationProp<RootStackParamList, "Balance">) => {
  const listCategory = useQuery(Category);
  const listBalance = useQuery(Balance);
  const { appConfig, createNewBalances } = useContext(AppConfigContext);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [allExpensesValue, setAllExpensesValue] = useState<number>(0);

  useContext(AppConfigContext);

  useEffect(() => {
    getAllValues();
  });

  useEffect(() => {
    getAllValues();
  }, []);

  const getAllValues = () => {
    setTotalBudget(listCategory.reduce((acc, category) => acc + category.budget, 0));
    appConfig?.dateToRenewBalance && setAllExpensesValue(listBalance.filtered('dueDate == $0', appConfig.dateToRenewBalance).reduce((acc, balance) => acc + balance.totalExpenses, 0));
  }

  const onRenewButtonPress = () => {
    if(getNextMonthDate() === appConfig.dateToRenewBalance){
      Alert.alert('Balance already renewed today. Try again tomorrow.');
      return;
    }
    Alert.alert('Confirm renewal?', 'This function will reset the balances of expenses.', [
      {text: 'Yes', onPress: () => createNewBalances()},
      {text: 'No', onPress: () => {}},
    ]);
  }

  return {
    appConfig,
    listCategory,
    listBalance,
    totalBudget,
    allExpensesValue,
    getAllValues,
    onRenewButtonPress
  }
}

export default useBalance;