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
import { RealmContext } from "../../../configs/RealmContext";
import * as categoryService from '../../../services/category.service';

const { useRealm, useQuery } = RealmContext;

const useDetailCategory = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DetailCategory'>) => {
  const { balance } = route.params;
  
  const realm = useRealm();
  const listTransaction = useQuery(Transaction);
  const { listBalance, getBalanceFromData } = useBalance();
  
  const [allExpensesResult, setAllExpensesResult] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<Tab>(DETAIL_CATEGORY_TABS[0]);
  const [filteredBalanceList, setFilteredBalanceList] = useState<Results<Balance>>();
  const [formatedTransactionList, setFormatedTransactionList] = useState<Array<{title: string, data: Array<Transaction>}>>();

  useFocusEffect(useCallback(() => {
    setFilteredBalanceList(listBalance.filtered('category._id == $0', balance.category._id));
    setFormatedTransactionList(formatTransactionList());
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

  const formatTransactionList = (): Array<{title: string, data: Array<Transaction>}> => {
    const tempList: Array<{title: string, data: Array<Transaction>}> = [];
    return Array.from(listTransaction.filtered('balance.category._id == $0', balance.category._id)).reverse().reduce((acc, transaction) => {
      const balanceFound = acc.find((item) => item.title === transaction.balance.dueDate);
      if(balanceFound) {
        acc.map((item) => {
          if(item.title === transaction.balance.dueDate) item.data.push(transaction);
          return item;
        })
      } else {
        acc.push({ title: transaction.balance.dueDate, data: [transaction] });
      }

      return acc;
    }, tempList)
  }

  const getBalanceFromTransactions = (listTransaction: Array<Transaction>): number => listTransaction.reduce((acc, transaction) => acc + transaction.value,0)
  
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