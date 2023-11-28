import { useContext } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useGlobalBalance from "../../../hooks/useBalance";
import { AppConfigContext } from "../../../context/appConfig.context";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

const useBalance = (_navigation: NativeStackNavigationProp<RootStackParamList, "Balance">) => {
  const { appConfig } = useContext(AppConfigContext);
  const { listCategory, listBalance, getAllCurrentValues } = useGlobalBalance();

  return {
    appConfig,
    listCategory,
    listBalance,
    getAllCurrentValues,
  }
}

export default useBalance;