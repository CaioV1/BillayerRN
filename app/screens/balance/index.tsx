import React from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Balance from "../../models/schemas/BalanceSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import MainMenu from "./components/mainMenu";
import { BalancePanel, ItemFlatList, SectionHeader } from "../../components";

import { listImgBase64 } from "../../resources/static/categoriesImages";
import { DEFAULT_BLACK, DEFAULT_BUTTON_COLOR, DEFAULT_RED } from "../../resources/values/colors";

import { styles } from "./styles";
import useBalance from "./hooks/useBalance";
import { convertToMoney } from "../../utils/string.util";

type BalanceScreenProps = NativeStackScreenProps<RootStackParamList, 'Balance'>;

const BalanceScreen: React.FC<BalanceScreenProps> = ({ navigation }) => {
  const { 
    listBalance, 
    loading, 
    appConfig,
    importBalances, 
    getAllCurrentValues, 
    handleRenewButtonPress, 
    handleExportButtonPress,
    handleImportButtonPress 
  } = useBalance(navigation);

  const renderCategories = (balance: Balance) => {
    console.log(balance.category.iconId)
    return (
      <TouchableOpacity key={balance._id!.toString()} onPress={() => navigation.navigate('DetailCategory', { balance })}>
        <ItemFlatList           
          title={balance.category.name} 
          value={convertToMoney(balance.category.budget - balance.totalExpenses)} 
          valueColor={(balance.category.budget - balance.totalExpenses) < 0 ? DEFAULT_RED : DEFAULT_BLACK}
          icon={listImgBase64.find((imgBase64) => imgBase64.id === balance.category.iconId)?.data}
          subtitle={`Budget: ${convertToMoney(balance.category.budget)} \nExpenses: ${convertToMoney(balance.totalExpenses)} `} 
        />
      </TouchableOpacity>
    )
  }
  
  return (
    <View>
      {
        loading ? (
          <ActivityIndicator style={styles.loadingView} size="small" color={DEFAULT_BUTTON_COLOR} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <BalancePanel {...getAllCurrentValues()} />
            <MainMenu 
              navigation={navigation} 
              importBalances={importBalances}
              onRenewButtonPress={handleRenewButtonPress}
              onExportButtonPress={handleExportButtonPress}
              onImportButtonPress={handleImportButtonPress}
            />
            <SectionHeader title='Balance category'/>
            {
              appConfig?.dateToRenewBalance && listBalance?.filtered('dueDate == $0', appConfig.dateToRenewBalance).sorted('category.name', true).map((item) => renderCategories(item))
            }
          </ScrollView>
        )
      }
     </View> 
  )
}

export default BalanceScreen;