import React from "react";
import { SectionList } from "react-native";

import { convertToMoney } from "../../../../utils/string.util";
import { ItemFlatList, SectionHeader } from "../../../../components";
import Transaction from "../../../../models/schemas/TransactionSchema";
import { listImgBase64 } from "../../../../resources/static/categoriesImages";

interface DetailedTabComponentProps {
  formatedTransactionList: Array<{title: string, data: Array<Transaction>}> | undefined;
  getBalanceFromTransactions: (items: Array<Transaction>) => number;
}

const DetailedTabComponent: React.FC<DetailedTabComponentProps> = ({ formatedTransactionList, getBalanceFromTransactions }) => {
  const renderSectionHeader = (title: string, value: number) => (
    <SectionHeader title={title} value={convertToMoney(value)}/>
  )

  const renderItem = (transaction: Transaction) => (
    <ItemFlatList 
      title={transaction.name} 
      value={convertToMoney(transaction.value)} 
      icon={listImgBase64.find((imgBase64) => imgBase64.id === transaction.balance.category.iconId)?.data}
      subtitle={transaction.createdAt} 
    />
  )

  return (
    <>
      {
        formatedTransactionList && formatedTransactionList.length > 0 && 
        <SectionList
          contentContainerStyle={{paddingBottom: 300}}
          showsVerticalScrollIndicator={false}
          sections={formatedTransactionList}
          keyExtractor={(item) => item._id.toString()}
          renderSectionHeader={({section }) => renderSectionHeader(section.title, getBalanceFromTransactions(section.data))}
          renderItem={({item}) => renderItem(item)}
        />
      }
    </>
  )
}

export default DetailedTabComponent;