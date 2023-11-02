import React from "react";
import { Button, FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import IBalance from "../../models/interfaces/Balance";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { ItemFlatList } from "../../components";
import { convertToMoney } from "../../utils/string.util";
import { listImgBase64 } from "../../resources/static/imgBase64";

import useBalance from "./hooks/useBalance";

type BalanceScreenProps = NativeStackScreenProps<RootStackParamList, 'Balance'>;

const BalanceScreen: React.FC<BalanceScreenProps> = ({ navigation }) => {
  const { listBalance } = useBalance(navigation);

  const renderCategories = (balance: IBalance) => {
    return (
      <ItemFlatList 
        key={balance._id.toString()}
        title={balance.category.name} 
        value={convertToMoney(balance.category.budget - balance.totalExpenses)} 
        icon={listImgBase64.find((imgBase64) => imgBase64.id === balance.category.iconId)?.data}
        subtitle={`Budget: ${convertToMoney(balance.category.budget)} \nExpenses: ${convertToMoney(balance.totalExpenses)} `} 
      />
    )
  }
  
  return (
    <View style={{flex: 1, paddingTop: 10, paddingBottom: 20}}>
      <FlatList data={listBalance} renderItem={({item}) => renderCategories(item)} />
      <Button title="Add Category" onPress={() => {
        navigation.navigate('CreateCategory');
      }}/>
      <Button title="Transactions" onPress={() => {
        navigation.navigate('Transactions');
      }}/>
     </View> 
  )
}

export default BalanceScreen;