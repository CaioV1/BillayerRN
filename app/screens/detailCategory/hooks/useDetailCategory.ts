import { Alert } from "react-native";
import { Results } from "realm/dist/bundle";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Tab from "../../../models/interfaces/Tab";
import Balance from "../../../models/schemas/BalanceSchema";
import Transaction from "../../../models/schemas/TransactionSchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { DETAIL_CATEGORY_TABS } from "../../../resources/values/consts";

import useBalance from "../../../hooks/useBalance";
import useTransaction from "../../../hooks/useTransaction";

import { RealmContext } from "../../../configs/RealmContext";
import * as categoryService from '../../../services/category.service';

const { useRealm } = RealmContext;

const useDetailCategory = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DetailCategory'>) => {
  const { balance } = route.params;
  
  const realm = useRealm();
  const { listBalance, getBalanceFromData } = useBalance();
  const { listTransaction, formatTransactionListToSection, getBalanceFromTransactions } = useTransaction();
  
  const [allExpensesResult, setAllExpensesResult] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<Tab>(DETAIL_CATEGORY_TABS[0]);
  const [filteredBalanceList, setFilteredBalanceList] = useState<Results<Balance>>();
  const [formatedTransactionList, setFormatedTransactionList] = useState<Array<{title: string, data: Array<Transaction>}>>();

  useFocusEffect(useCallback(() => {
    setFilteredBalanceList(listBalance.filtered('category._id == $0', balance.category._id));
    setFormatedTransactionList(formatTransactionListToSection(listTransaction.filtered('balance.category._id == $0', balance.category._id)));
  }, []));

  useEffect(() => {
    filteredBalanceList && setAllExpensesResult(filteredBalanceList.reduce((acc, balance) => acc + balance.totalExpenses, 0))
  }, [filteredBalanceList]);

  const deleteCategory = (balance: Balance) => {
    try {
      categoryService.deleteCategory(realm, balance, listTransaction, listBalance);
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
    selectedTab,
    allExpensesResult,
    filteredBalanceList,
    formatedTransactionList,
    getBalanceFromTransactions,
    getBalanceFromData,
    setSelectedTab,
    onDeleteButtonPress
  }
}

export default useDetailCategory;