import React from "react";
import { Button, FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import ICategory from "../../models/interfaces/Category";
import Category from "../../models/schemas/CategorySchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { categoryMock } from "../../resources/mocks/category";
import { listImgBase64 } from "../../resources/static/imgBase64";

import { ItemFlatList } from "../../components";
import { RealContext } from "../../configs/RealmContext";
import { convertToMoney } from "../../utils/string.util";

const { useRealm, useQuery } = RealContext;

type BalanceScreenProps = NativeStackScreenProps<RootStackParamList, 'Balance'>;

const BalanceScreen: React.FC<BalanceScreenProps> = ({ navigation }) => {
  const realm = useRealm();
  const response = useQuery(Category);

  console.log(response[0]);

  // const deleteTransaction = (transaction: ITransaction) => {
  //   realm.write(() => {
  //     realm.delete(transaction);
  //   });
  // };

  // useEffect(() => {
  //   deleteTransaction(response[0]);
  // }, [])

  const renderCategories = (category: ICategory) => {
    return (
      <ItemFlatList 
        key={category._id.toString()}
        title={category.name} 
        value={convertToMoney(category.budget - (category.totalExpense || 0))} 
        icon={listImgBase64.find((imgBase64) => imgBase64.id === category.iconId)?.data}
        subtitle={`Budget: ${convertToMoney(category.budget)} \nExpenses: ${convertToMoney(category.totalExpense || 0)} `} 
      />
    )
  }
  
  return (
    <View style={{flex: 1, paddingTop: 10, paddingBottom: 20}}>
      <FlatList data={response} renderItem={({item}) => renderCategories(item)} />
      <Button title="Add Category" onPress={() => {
        navigation.navigate('CreateCategory');
      }}/>
     </View> 
  )
}

export default BalanceScreen;