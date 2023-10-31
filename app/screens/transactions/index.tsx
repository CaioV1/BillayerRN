import React, { useEffect } from "react"
import { Button, FlatList, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import ITransaction from "../../models/interfaces/Transaction";
import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { ItemFlatList } from "../../components";
import { RealContext } from "../../configs/RealmContext";
import { getDefaultDatetimeFormatText } from "../../utils/date.util";

const { useRealm, useQuery } = RealContext;

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  const realm = useRealm();
  const response = useQuery(Transaction);

  // console.log(response[0]._id);

  // const deleteTransaction = (transaction: ITransaction) => {
  //   realm.write(() => {
  //     realm.delete(transaction);
  //   });
  // };

  // useEffect(() => {
  //   deleteTransaction(response[0]);
  // }, [])

  const renderTransactions = (transaction: ITransaction) => {
    return (
      <ItemFlatList 
        key={transaction._id.toString()}
        title={transaction.name} 
        value={'10'} 
        subtitle={getDefaultDatetimeFormatText(transaction.createdAt)} 
      />
    )
  }

  return (
    <View style={{flex: 1, paddingTop: 10, paddingBottom: 20}}>
      <FlatList data={response} renderItem={({item}) => renderTransactions(item)} />
      <Button title="Add Transaction" onPress={() => {
        navigation.navigate('CreateTransaction');
      }}/>
    </View>
  )
}

export default TransactionsScreen;