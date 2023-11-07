import { Alert } from "react-native";
import { Results } from "realm/dist/bundle";
import { useContext, useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Balance from "../../../models/schemas/BalanceSchema";
import ITransaction from '../../../models/interfaces/Transaction';
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { getDefaultDateFormat } from "../../../utils/date.util";
import { AppConfigContext } from "../../../context/appConfig.context";

const { useRealm, useQuery } = RealmContext;

const useCreateTransaction = (navigation: NativeStackNavigationProp<RootStackParamList, "CreateTransaction", undefined>) => {
  const realm = useRealm();
  const fullListBalance = useQuery(Balance);
  const { appConfig } = useContext(AppConfigContext);

  const [listBalance, setListBalance] = useState<Results<Balance>>();
  const [transaction, setTransaction] = useState<Partial<ITransaction>>();

  useEffect(() => {
    setListBalance(fullListBalance.filtered('dueDate == $0', appConfig.dateToRenewBalance));
  }, [])

  const onChange = (key: string, value: any) => {
    setTransaction((previouValue) => ({
      ...previouValue,
      [key]: value
    }));
  }

  const onCategorySelected = (_id: string) => {
    const balance = listBalance!.find((balance) => balance._id.toString() === _id);

    if(balance) setTransaction((previouValue) => ({
      ...previouValue,
      balance
    }));
  }

  const onButtonPress = () => {
    if(!transaction?.name){
      Alert.alert("Please fill the name field");
      return;
    }

    if(!transaction?.value){
      Alert.alert("Please fill the value field");
      return;
    }

    if(!transaction?.balance){
      Alert.alert("Please select a category");
      return;
    }

    const pattern = /^-?\d+(\.\d+)?$/;
    if(!pattern.test(transaction.value.toString())){
      Alert.alert("Please fill only numbers in the value field");
      return;
    }

    const balance = realm.objectForPrimaryKey<Balance>('Balance', transaction.balance._id);

    realm.write(() => {
      const floatValue = parseFloat(transaction.value!.toString())
      realm.create('Transaction', { 
        name: transaction.name!,
        value: floatValue,
        balance: transaction.balance,
        createdAt: getDefaultDateFormat(new Date())
      });

      if(balance){
        balance.totalExpenses = balance.totalExpenses + floatValue;
      }
    });

    navigation.goBack();
  }

  return {
    transaction,
    listBalance,
    onCategorySelected,
    onChange,
    onButtonPress  
  }
}

export default useCreateTransaction;