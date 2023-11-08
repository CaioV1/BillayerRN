import { Alert } from "react-native";
import { useContext } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { getNextMonthDate } from "../../../utils/date.util";
import { AppConfigContext } from "../../../context/appConfig.context";

import useGlobalBalance from "../../../hooks/useBalance";

const useBalance = (navigation: NativeStackNavigationProp<RootStackParamList, "Balance">) => {
  const { appConfig, createNewBalances } = useContext(AppConfigContext);
  const { listCategory, listBalance, getAllCurrentValues } = useGlobalBalance();

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
    getAllCurrentValues,
    onRenewButtonPress
  }
}

export default useBalance;