import React from "react";
import { FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import IBalance from "../../models/interfaces/Balance";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { BalancePanel, ImageButton, ItemFlatList } from "../../components";
import { convertToMoney } from "../../utils/string.util";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import { styles } from "./styles";
import useBalance from "./hooks/useBalance";
import { listMenu } from "../../resources/static/menuBalance";

type BalanceScreenProps = NativeStackScreenProps<RootStackParamList, 'Balance'>;

const BalanceScreen: React.FC<BalanceScreenProps> = ({ navigation }) => {
  const { listBalance, totalBudget, allExpensesValue } = useBalance(navigation);

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

  const renderTopButtons = (item) => {
    return (
      <ImageButton buttonTitle={item.name} imageBase64={item.data} onPress={() => navigation.navigate(item.screenRedirect)} />
    )
  }
  
  return (
    <View style={styles.viewContainer}>
      <BalancePanel budget={totalBudget} totalExpenses={allExpensesValue} />
      <FlatList style={styles.flatListMenu} showsHorizontalScrollIndicator={false} data={listMenu} horizontal={true} renderItem={({item}) => renderTopButtons(item)} />
      <FlatList data={listBalance} renderItem={({item}) => renderCategories(item)} />
     </View> 
  )
}

export default BalanceScreen;