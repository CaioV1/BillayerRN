import { Alert } from "react-native";
import { Results } from "realm/dist/bundle";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Balance from "../../../models/schemas/BalanceSchema";
import Transaction from "../../../models/schemas/TransactionSchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import useBalance from "../../../hooks/useBalance";
import { RealmContext } from "../../../configs/RealmContext";
import * as categoryService from '../../../services/category.service';

const { useRealm, useQuery } = RealmContext;

const useDetailCategory = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DetailCategory'>) => {
  const { balance } = route.params;

  const realm = useRealm();
  const listTransaction = useQuery(Transaction);
  const { listBalance, getBalanceFromData } = useBalance();

  const [allExpensesResult, setAllExpensesResult] = useState<number>(0);
  const [filteredBalanceList, setFilteredBalanceList] = useState<Results<Balance>>();

  useEffect(() => {
    setFilteredBalanceList(listBalance.filtered('category._id == $0', balance.category._id));
  }, []);

  useEffect(() => {
    filteredBalanceList && setAllExpensesResult(filteredBalanceList.reduce((acc, balance) => acc + balance.totalExpenses, 0))
  }, [filteredBalanceList]);

  const deleteCategory = (balance: Balance) => {
    try {
      categoryService.deleteCategory(realm, balance, listTransaction);
      navigation.goBack();
    } catch (error) {
      Alert.alert('An error has occurred while deleting the category data');
      console.log(error);
    }
  }

  const onDeleteButtonPress = () => {
    Alert.alert('Confirm delete', 'This action will delete all balances and transactions of this category.', [
      { text: 'Yes', onPress: () => { deleteCategory(balance) } },
      { text: 'No', onPress: () => {} }
    ])
  }
  
  return {
    balance,
    allExpensesResult,
    filteredBalanceList,
    getBalanceFromData,
    onDeleteButtonPress
  }
}

export default useDetailCategory;