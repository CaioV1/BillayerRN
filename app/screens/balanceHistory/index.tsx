import React from "react";
import { SectionList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Balance from "../../models/interfaces/Balance";
import RootStackParamList from "../../models/interfaces/RootScreensParams";

import { convertToMoney } from "../../utils/string.util";
import useBalanceHistory from "./hooks/useBalanceHistory";
import { ItemFlatList, SectionHeader } from "../../components";

import { listImgBase64 } from "../../resources/static/categoriesImages";
import { DEFAULT_BLACK, DEFAULT_RED } from "../../resources/values/colors";

type BalanceHistoryProps = NativeStackScreenProps<RootStackParamList, 'BalanceHistory'>;

const BalanceHistory: React.FC<BalanceHistoryProps> = ({ navigation }) => {
  const { listFormattedBalance, getBalanceFromData } = useBalanceHistory(navigation);

  const renderSectionHeader = (title: string, value: number) => (
    <SectionHeader title={title} value={convertToMoney(value)} valueColor={value > 0 ? DEFAULT_BLACK : DEFAULT_RED}/>
  )

  const renderItem = (item: Balance) => (
    <ItemFlatList 
      key={item._id!.toString()}
      title={item.category.name} 
      value={convertToMoney(item.budget - item.totalExpenses)} 
      valueColor={(item.budget - item.totalExpenses) < 0 ? DEFAULT_RED : DEFAULT_BLACK}
      icon={listImgBase64.find((imgBase64) => imgBase64.id === item.category.iconId)?.data}
      subtitle={`Budget: ${convertToMoney(item.budget)} \nExpenses: ${convertToMoney(item.totalExpenses)} `} 
    />
  )

  return (
    <View>
      {
        listFormattedBalance.length > 0 && 
        <SectionList
          sections={listFormattedBalance}
          keyExtractor={(item) => item._id!.toString()}
          renderSectionHeader={({section }) => renderSectionHeader(section.title, getBalanceFromData(section.data))}
          renderItem={({item}) => renderItem(item)}
        />
      }
    </View>
  )
}

export default BalanceHistory;