import React from "react"
import { ScrollView, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import ITransaction from "../../models/interfaces/Transaction";
import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { BottomButton, ItemFlatList } from "../../components";
import { RealmContext } from "../../configs/RealmContext";
import { listImgBase64 } from "../../resources/static/categoriesImages";
import { convertToMoney } from "../../utils/string.util";

const { useQuery } = RealmContext;

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  const response = useQuery(Transaction);

  const renderTransactions = (transaction: ITransaction) => {
    return (
      <ItemFlatList 
        key={transaction._id.toString()}
        title={transaction.name} 
        value={convertToMoney(transaction.value)} 
        icon={listImgBase64.find((imgBase64) => imgBase64.id === transaction.balance.category.iconId)?.data}
        subtitle={transaction.createdAt} 
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{marginBottom: 80}} showsVerticalScrollIndicator={false}>
        {
          response.map((item) => renderTransactions(item))
        }  
      </ScrollView>
      <BottomButton title="Add Transaction" onButtonPress={() => {
        navigation.navigate('CreateTransaction');
      }}/>
    </View>
  )
}

export default TransactionsScreen;