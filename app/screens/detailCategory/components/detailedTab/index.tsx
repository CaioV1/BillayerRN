import React from "react";
import { SectionList, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { listImgBase64 } from "../../../../resources/static/categoriesImages";

import { convertToMoney } from "../../../../utils/string.util";
import { ItemFlatList, SectionHeader } from "../../../../components";

import Transaction from "../../../../models/schemas/TransactionSchema";
import RootStackParamList from "../../../../models/interfaces/RootScreensParams";

interface DetailedTabComponentProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DetailCategory' | 'Transactions'>;
  formatedTransactionList: Array<{title: string, data: Array<Transaction>}> | undefined;
  getBalanceFromTransactions: (items: Array<Transaction>) => number;
}

const DetailedTabComponent: React.FC<DetailedTabComponentProps> = ({ navigation, formatedTransactionList, getBalanceFromTransactions }) => {
  const renderSectionHeader = (title: string, value: number) => (
    <SectionHeader title={title} value={convertToMoney(value)}/>
  )

  const renderItem = (transaction: Transaction) => (
    <TouchableOpacity key={transaction._id!.toString()} onPress={() => navigation.navigate('DetailTransaction', { transaction })}>
      <ItemFlatList 
        title={transaction.name} 
        value={convertToMoney(transaction.value)} 
        icon={listImgBase64.find((imgBase64) => imgBase64.id === transaction.balance.category.iconId)?.data}
        subtitle={transaction.createdAt} 
      />
    </TouchableOpacity>
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