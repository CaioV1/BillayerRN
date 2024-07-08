import { Results } from "realm/dist/bundle";

import { RealmContext } from "../configs/RealmContext";
import Transaction from "../models/schemas/TransactionSchema";

const { useQuery } = RealmContext;

const useTransaction = () => {
  const listTransaction = useQuery(Transaction);

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

  return {
    listTransaction,
    formatTransactionListToSection,
    getBalanceFromTransactions
  }
}

export default useTransaction;