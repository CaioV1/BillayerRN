import { useContext, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useGlobalBalance from "../../../hooks/useBalance";
import { AppConfigContext } from "../../../context/appConfig.context";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

const useBalance = (_navigation: NativeStackNavigationProp<RootStackParamList, "Balance">) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { appConfig } = useContext(AppConfigContext);
  const { listCategory, listBalance, getAllCurrentValues } = useGlobalBalance();

  return {
    appConfig,
    listCategory,
    listBalance,
    loading, 
    setLoading,
    getAllCurrentValues,
  }
}

export default useBalance;