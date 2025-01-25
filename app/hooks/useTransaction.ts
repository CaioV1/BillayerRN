import { useEffect, useMemo, useState } from "react";
import { Results } from "realm/dist/bundle";

import { RealmContext } from "../configs/RealmContext";
import Transaction from "../models/schemas/TransactionSchema";
import { SEARCH_TEXT_MINIMUM_LENGTH } from "../resources/values/consts";
import Filter from "../models/interfaces/Filter";

const { useQuery } = RealmContext;

const useTransaction = () => {
  const listTransaction = useQuery(Transaction);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredList, setFilteredList] = useState<Results<Transaction> | undefined>();

  useEffect(() => {
    if(searchValue === '.') {
      setFilteredList(listTransaction);
      return;
    }

    setFilteredList(searchValue.length > SEARCH_TEXT_MINIMUM_LENGTH ? listTransaction.filtered('name CONTAINS[c] $0 ', searchValue) : undefined);
  }, [searchValue])

  const totalValue: number = useMemo(() => {
    return filteredList && filteredList.length > 1 ? filteredList.reduce((acc, transaction) => acc + transaction.value ,0) : 0;
   }, [filteredList])

  const formatTransactionListToSection = (listTransaction: Results<Transaction>): Array<{title: string, data: Array<Transaction>}> => {
    const tempList: Array<{title: string, data: Array<Transaction>}> = [];
    return Array.from(listTransaction).reverse().reduce((acc, transaction) => {
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

  const filterTransactions = (filterForm?: Filter) => {
    let tempList = listTransaction;

    if(filterForm?.transactionName) tempList = tempList.filtered('name CONTAINS[c] $0', filterForm.transactionName);
    if(filterForm?.month) tempList = tempList.filtered('createdAt CONTAINS[c] $0', `/${filterForm.month}/`);
    if(filterForm?.year) tempList = tempList.filtered('createdAt CONTAINS[c] $0', `/${filterForm.year}`);
    if(filterForm?.category) tempList = tempList.filtered('balance.category._id == $0', new Realm.BSON.UUID(filterForm?.category));

    setFilteredList(tempList);
  }

  return {
    listTransaction,
    searchValue,
    filteredList,
    totalValue,
    setSearchValue,
    formatTransactionListToSection,
    getBalanceFromTransactions,
    filterTransactions
  }
}

export default useTransaction;