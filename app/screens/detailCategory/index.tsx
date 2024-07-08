import React from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { listMenu } from "../../resources/static/menuBalance";

import { convertToMoney } from "../../utils/string.util";

import { ImageButton, Tab } from "../../components";
import { DetailedTabComponent, ResumedTabComponent } from "./components";

import { styles } from "./styles";
import useDetailCategory from "./hooks/useDetailCategory";

export const TOTAL_TABS = 2;
export const RESUMED_TAB_ID = 1;
export const DETAILED_TAB_ID = 2;

type DetailCategoryProps = NativeStackScreenProps<RootStackParamList, 'DetailCategory'>;

const DetailCategory: React.FC<DetailCategoryProps> = ({ route, navigation }) => {
  const { 
    balance, 
    filteredBalanceList, 
    formatedTransactionList, 
    allExpensesResult, 
    getBalanceFromTransactions, 
    onDeleteButtonPress 
  } = useDetailCategory({ route, navigation });

  return (
    <View>
      <View style={styles.viewHeaderTexts}>
        <Text style={styles.categoryNameText}>{balance.category.name}</Text>
        <Text style={styles.categoryBudgetText}>{convertToMoney(balance.category.budget)}</Text>
      </View>
      <View style={styles.viewImageButtons}>
        <ImageButton buttonTitle='Add Transaction' imageBase64={listMenu[2].data} onPress={() => navigation.navigate('CreateTransaction', { balance })} />
        <ImageButton buttonTitle='Edit' imageBase64={listMenu[5].data} onPress={() => navigation.navigate('CreateCategory', { category: balance.category })} />
        <ImageButton buttonTitle='Delete' imageBase64={listMenu[6].data} onPress={() => onDeleteButtonPress()} />
      </View>
      <Tab.Root totalTabs={TOTAL_TABS}>
        <Tab.Header>
          <Tab.Title opensTab={RESUMED_TAB_ID}>Resumed</Tab.Title>
          <Tab.Title opensTab={DETAILED_TAB_ID}>Detailed</Tab.Title>
        </Tab.Header>
        <Tab.Content tabId={RESUMED_TAB_ID}>
          { filteredBalanceList && <ResumedTabComponent filteredBalanceList={filteredBalanceList} allExpensesResult={allExpensesResult} /> }
        </Tab.Content>
        <Tab.Content tabId={DETAILED_TAB_ID}>
          <DetailedTabComponent navigation={navigation} formatedTransactionList={formatedTransactionList} getBalanceFromTransactions={getBalanceFromTransactions} />
        </Tab.Content>
      </Tab.Root>
    </View>
  )
}

export default DetailCategory;