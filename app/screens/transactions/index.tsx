import React from "react"
import { Button, FlatList, ScrollView, ScrollViewComponent, Text, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Transaction from "../../models/interfaces/Transaction";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { ItemFlatList } from "../../components";
import { getDefaultDatetimeFormatText } from "../../utils/date.util";
import { transactionsMock } from "../../resources/mocks/transactions";

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {

  const renderTransactions = (transaction: Transaction) => {
    return (
      <ItemFlatList 
        key={transaction.id}
        title={transaction.name} 
        value={transaction.value.toString()} 
        subtitle={getDefaultDatetimeFormatText(transaction.createdAt)} 
      />
    )
  }

  return (
    <View style={{flex: 1, paddingTop: 10, paddingBottom: 20}}>
      <FlatList data={transactionsMock} renderItem={({item}) => renderTransactions(item)} />
      <Button title="Add Transaction" onPress={() => {
        navigation.navigate('Balance');
      }}/>
    </View>
  )
}

export default TransactionsScreen;