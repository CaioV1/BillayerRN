import React, { useContext } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import IBalance from "../../models/interfaces/Balance";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { BalancePanel, ImageButton, ItemFlatList } from "../../components";
import { convertToMoney } from "../../utils/string.util";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import useBalance from "./hooks/useBalance";
import { listMenu } from "../../resources/static/menuBalance";

type BalanceScreenProps = NativeStackScreenProps<RootStackParamList, 'Balance'>;

const BalanceScreen: React.FC<BalanceScreenProps> = ({ navigation }) => {
  const { listBalance, totalBudget, allExpensesValue, appConfig, onRenewButtonPress } = useBalance(navigation);

  const renderCategories = (balance: IBalance) => {
    return (
      <ItemFlatList 
        key={balance._id.toString()}
        title={balance.category.name} 
        value={convertToMoney(balance.category.budget - balance.totalExpenses)} 
        valueColor={(balance.category.budget - balance.totalExpenses) < 0 ? 'red' : '#000000'}
        icon={listImgBase64.find((imgBase64) => imgBase64.id === balance.category.iconId)?.data}
        subtitle={`Budget: ${convertToMoney(balance.category.budget)} \nExpenses: ${convertToMoney(balance.totalExpenses)} `} 
      />
    )
  }
  
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BalancePanel budget={totalBudget} totalExpenses={allExpensesValue} />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <ImageButton buttonTitle='List Transaction' imageBase64={listMenu[0].data} onPress={() => navigation.navigate('Transactions')} />
          <ImageButton buttonTitle='Add Category' imageBase64={listMenu[1].data} onPress={() => navigation.navigate('CreateCategory')} />
          <ImageButton buttonTitle='Add Transaction' imageBase64={listMenu[2].data} onPress={() => navigation.navigate('CreateTransaction')} />
          <ImageButton buttonTitle='Renew Balance' imageBase64={listMenu[3].data} onPress={() => onRenewButtonPress()} />
        </ScrollView>
        {
          appConfig?.dateToRenewBalance && listBalance?.filtered('dueDate == $0', appConfig.dateToRenewBalance).map((item) => renderCategories(item))
        }
      </ScrollView>
     </View> 
  )
}

export default BalanceScreen;