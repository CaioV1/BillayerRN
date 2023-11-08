import React from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Balance from "../../models/interfaces/Balance";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { listMenu } from "../../resources/static/menuBalance";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import { convertToMoney } from "../../utils/string.util";
import { ImageButton, ItemFlatList, SectionHeader } from "../../components";

import { styles } from "./styles";
import useDetailCategory from "./hooks/useDetailCategory";

type DetailCategoryProps = NativeStackScreenProps<RootStackParamList, 'DetailCategory'>;

const DetailCategory: React.FC<DetailCategoryProps> = ({ route, navigation }) => {
  const { balance, filteredBalanceList, allExpensesResult, onDeleteButtonPress } = useDetailCategory({ route, navigation });

  const renderItem = (item: Balance) => (
    <ItemFlatList 
      key={item._id.toString()}
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
      { filteredBalanceList && <SectionHeader title='History Expenses' value={convertToMoney(allExpensesResult)}/> }
      { filteredBalanceList && filteredBalanceList.map((balance) => renderItem(balance)) }
    </View>
  )
}

export default DetailCategory;