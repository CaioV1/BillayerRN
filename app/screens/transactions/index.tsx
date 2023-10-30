import React from "react"
import { Button, FlatList, Text, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Transaction from "../../models/Transaction";
import RootStackParamList from "../../models/RootScreensParams"

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
        icon="ola.png"
        datetime={getDefaultDatetimeFormatText(transaction.createdAt)} 
      />
    )
  }

  return (
    <View>
      <Text>Título Transações</Text>
      <FlatList data={transactionsMock} renderItem={({item}) => renderTransactions(item)} />
      <Button title="Ir" onPress={() => {
        navigation.navigate('Balance');
      }}/>
    </View>
  )
}

export default TransactionsScreen;