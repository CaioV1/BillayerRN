import { Alert } from "react-native";
import { Results } from "realm/dist/bundle";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Balance from "../../../models/schemas/BalanceSchema";
import ITransaction from '../../../models/interfaces/Transaction';
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { AppConfigContext } from "../../../context/appConfig.context";
import { createTransaction, updateTransaction } from "../../../services/transaction.service";

const { useRealm, useQuery } = RealmContext;

const useCreateTransaction = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>) => {
  const paramTransaction = route.params?.transaction;

  const realm = useRealm();
  const fullListBalance = useQuery(Balance);
  const { appConfig } = useContext(AppConfigContext);

  const [listBalance, setListBalance] = useState<Results<Balance>>();
  const [transaction, setTransaction] = useState<Partial<ITransaction>>();

  useEffect(() => {
    setListBalance(fullListBalance.filtered('dueDate == $0', appConfig.dateToRenewBalance));
    paramTransaction && setTransaction(paramTransaction);
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
    onCategorySelected,
    onChange,
    onButtonPress  
  }
}

export default useCreateTransaction;