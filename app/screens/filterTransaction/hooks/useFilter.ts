import { useEffect, useMemo, useState } from "react";
import useBalance from "../../../hooks/useBalance";
import { getListMonths, getListYears } from "../../../utils/date.util";
import useTransaction from "../../../hooks/useTransaction";
import Filter from "../../../models/interfaces/Filter";
import { Results } from "realm/dist/bundle";
import Transaction from "../../../models/schemas/TransactionSchema";
import { Alert } from "react-native";

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