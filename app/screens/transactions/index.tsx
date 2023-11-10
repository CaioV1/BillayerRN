import React from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { BottomButton, ItemFlatList } from "../../components";
import { RealmContext } from "../../configs/RealmContext";
import { convertToMoney } from "../../utils/string.util";
import { listImgBase64 } from "../../resources/static/categoriesImages";

const { useQuery } = RealmContext;

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  const response = useQuery(Transaction);

  const renderTransactions = (transaction: Transaction) => {
    return (
      <TouchableOpacity key={transaction._id!.toString()} onPress={() => navigation.navigate('DetailTransaction', { transaction })}>
        <ItemFlatList 
          title={transaction.name} 
          value={convertToMoney(transaction.value)} 
          icon={listImgBase64.find((imgBase64) => imgBase64.id === transaction.balance.category.iconId)?.data}
          subtitle={transaction.createdAt} 
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{marginBottom: 80}} showsVerticalScrollIndicator={false}>
        {
          response && response.sorted('_id', true).map((item) => renderTransactions(item))
        }  
      </ScrollView>
      <BottomButton title="Add Transaction" onButtonPress={() => {
        navigation.navigate('CreateTransaction', {});
      }}/>
    </View>
  )
}

export default TransactionsScreen;