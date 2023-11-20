import React from "react";
import { ScrollView, SectionList, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Tab from "../../models/interfaces/Tab";
import Balance from "../../models/interfaces/Balance";
import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { listMenu } from "../../resources/static/menuBalance";
import { DETAIL_CATEGORY_TABS } from "../../resources/values/consts";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import { convertToMoney } from "../../utils/string.util";
import { ImageButton, ItemFlatList, SectionHeader, Tabs } from "../../components";

import { styles } from "./styles";
import useDetailCategory from "./hooks/useDetailCategory";

type DetailCategoryProps = NativeStackScreenProps<RootStackParamList, 'DetailCategory'>;

const DetailCategory: React.FC<DetailCategoryProps> = ({ route, navigation }) => {
  const { balance, filteredBalanceList, formatedTransactionList, selectedTab, allExpensesResult, getBalanceFromTransactions, setSelectedTab, onDeleteButtonPress } = useDetailCategory({ route, navigation });

  const renderSectionHeader = (title: string, value: number) => (
    <SectionHeader title={title} value={convertToMoney(value)}/>
  )

  const renderItemTransaction = (transaction: Transaction) => (
    <ItemFlatList 
      title={transaction.name} 
      value={convertToMoney(transaction.value)} 
      icon={listImgBase64.find((imgBase64) => imgBase64.id === transaction.balance.category.iconId)?.data}
      subtitle={transaction.createdAt} 
    />
  )

  const renderItem = (item: Balance) => (
    <ItemFlatList 
      key={item._id!.toString()}
      title={item.dueDate} 
      value={convertToMoney(item.totalExpenses)} 
      icon={listImgBase64.find((imgBase64) => imgBase64.id === item.category.iconId)?.data}
    />
  )

  return (
    <View>
      <View style={styles.viewHeaderTexts}>
        <Text style={styles.categoryNameText}>{balance.category.name}</Text>
        <Text style={styles.categoryBudgetText}>{convertToMoney(balance.category.budget)}</Text>
      </View>
      <View style={styles.viewImageButtons}>
        <ImageButton buttonTitle='Edit' imageBase64={listMenu[5].data} onPress={() => navigation.navigate('CreateCategory', { category: balance.category })} />
        <ImageButton buttonTitle='Delete' imageBase64={listMenu[6].data} onPress={() => onDeleteButtonPress()} />
      </View>
      <Tabs tabs={DETAIL_CATEGORY_TABS} onPress={(tab: Tab) => setSelectedTab(tab)} />
      {
        selectedTab.id === 1 ? (
          <>
            { filteredBalanceList && <SectionHeader title='Total' value={convertToMoney(allExpensesResult)}/> }
            <ScrollView showsVerticalScrollIndicator={false}>
              { filteredBalanceList && Array.from(filteredBalanceList).reverse().map((balance) => renderItem(balance)) }
            </ScrollView>
          </>
        ) : (
          <>
            {
              formatedTransactionList && formatedTransactionList.length > 0 && 
              <SectionList
                contentContainerStyle={{paddingBottom: 300}}
                showsVerticalScrollIndicator={false}
                sections={formatedTransactionList}
                keyExtractor={(item) => item._id.toString()}
                renderSectionHeader={({section }) => renderSectionHeader(section.title, getBalanceFromTransactions(section.data))}
                renderItem={({item}) => renderItemTransaction(item)}
              />
            }
          </>
        )
      }
    </View>
  )
}

export default DetailCategory;