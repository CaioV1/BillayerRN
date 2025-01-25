import { Alert } from "react-native";
import { Results } from "realm/dist/bundle";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Balance from "../../../models/schemas/BalanceSchema";
import ITransaction from '../../../models/interfaces/Transaction';
import Transaction from "../../../models/schemas/TransactionSchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import useTransaction from "../../../hooks/useTransaction";
import { RealmContext } from "../../../configs/RealmContext";
import { createTransaction, updateTransaction } from "../../../services/transaction.service";
import useBalance from "../../../hooks/useBalance";

const { useRealm } = RealmContext;

const useCreateTransaction = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>) => {
  const paramTransaction = route.params?.transaction;
  const balance = route.params?.balance;

  const realm = useRealm();
  const { listBalance, setCurrentBalanceList } = useBalance();
  const { searchValue, setSearchValue, filteredList } = useTransaction();

  const [transaction, setTransaction] = useState<Partial<ITransaction>>();

  useEffect(() => {
    setCurrentBalanceList();
    paramTransaction && setTransaction(paramTransaction);
    balance && onChange('balance', balance);
  }, [])

  const onChange = (key: string, value: any) => {
    setTransaction((previouValue) => ({
      ...previouValue,
      [key]: value
    }));
  }

  const onCategorySelected = (_id: string) => {
    const balance = listBalance!.find((balance) => balance._id!.toString() === _id);

    if(balance) setTransaction((previouValue) => ({
      ...previouValue,
      balance
    }));
  }

  const validateFields = (): string | void => {
    if(!transaction?.name) return "Please fill the name field"
    if(!transaction?.value) return "Please fill the value field"
    if(!transaction?.balance) return "Please select a category"

    const pattern = /^-?\d+((\.|\,)\d+)?$/;
    if(!pattern.test(transaction.value.toString())) return "Please fill only numbers in the value field"; 
  }

  const onPressSearchItem = (transaction: Transaction) => { 
    setTransaction(transaction); 
    setSearchValue(''); 
    const results = listBalance!.filtered('category._id == $0', transaction.balance.category._id);
    results && results.length > 0 && onChange('balance', results[0]); 
  }

  const onButtonPress = () => {
    const validationResult = validateFields();

    if(validationResult){
      Alert.alert(validationResult);
      return;
    }

    const newTransaction: ITransaction = {
      _id: transaction!._id,
      name: transaction!.name!,
      value: transaction!.value!,
      balance: transaction!.balance!,
      createdAt: transaction!.createdAt
    }

    if(paramTransaction) {
      updateTransaction(realm, paramTransaction, newTransaction);
      navigation.pop(2);
    } else {
      createTransaction(realm, newTransaction);
      navigation.goBack()
    }
  }

  return {
    transaction,
    listBalance,
    paramTransaction,
    searchValue, 
    filteredList,
    onPressSearchItem,
    setTransaction,
    setSearchValue,
    onCategorySelected,
    onChange,
    onButtonPress
  }
}

export default useCreateTransaction;