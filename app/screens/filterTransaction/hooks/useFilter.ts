import { useEffect, useState } from "react";
import { Alert } from "react-native";

import useBalance from "../../../hooks/useBalance";
import useTransaction from "../../../hooks/useTransaction";

import Filter from "../../../models/interfaces/Filter";

import { getListMonths, getListYears } from "../../../utils/date.util";

const useFilter = () => {
  const { 
    listTransaction, 
    filteredList, 
    totalValue, 
    filterTransactions
  } = useTransaction();

  const { 
    listBalance, 
    setCurrentBalanceList 
  } = useBalance();

  const listMonths = getListMonths();

  const [hasPressed, setHasPressed] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Filter>();

  const listYears: number[] = listTransaction.length > 0 ? getListYears(listTransaction[0]?.createdAt) : getListYears();

  useEffect(() => {
    setCurrentBalanceList();
  }, [])

  const onChange = (key: string, value: any) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [key]: value
    }));
  }

  const onClickButton = () => {
    if(!formValues) {
      Alert.alert('Fill at least one of the fields');
      return;
    }

    setHasPressed(true);
    filterTransactions(formValues)
  }

  return {
    hasPressed,
    formValues,
    totalValue,
    filteredList,
    listMonths,
    listYears,
    listBalance,
    onChange,
    onClickButton
  }
}

export default useFilter;