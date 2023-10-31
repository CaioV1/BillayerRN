import React from "react";
import { FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import RootStackParamList from "../../models/interfaces/RootScreensParams"
import { ItemFlatList } from "../../components";
import { categoryMock } from "../../resources/mocks/category";
import Category from "../../models/interfaces/Category";
import { convertToMoney } from "../../utils/string.util";
import { listImgBase64 } from "../../resources/static/imgBase64";

type BalanceScreenProps = NativeStackScreenProps<RootStackParamList, 'Balance'>;

const BalanceScreen: React.FC<BalanceScreenProps> = ({ navigation }) => {
  const renderTransactions = (category: Category) => {
    return (
      <ItemFlatList 
        key={category.id}
        title={category.name} 
        value={convertToMoney(category.budget - category.totalExpense)} 
        icon={listImgBase64.find((imgBase64) => imgBase64.id === category.iconId)?.data}
        subtitle={`Budget: ${convertToMoney(category.budget)} \nExpenses: ${convertToMoney(category.totalExpense)} `} 
      />
    )
  }
  
  return (
    <View style={{flex: 1, paddingTop: 10, paddingBottom: 20}}>
      <FlatList data={categoryMock} renderItem={({item}) => renderTransactions(item)} />
     </View> 
  )
}

export default BalanceScreen;