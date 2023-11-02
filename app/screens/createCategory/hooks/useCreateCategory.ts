import { useContext, useState } from "react";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ICategory from '../../../models/interfaces/Category';
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { getDefaultDateFormat } from "../../../utils/date.util";
import { AppConfigContext } from "../../../context/appConfig.context";
import Category from "../../../models/schemas/CategorySchema";

const { useRealm } = RealmContext;

const useCreateCategory = (navigation: NativeStackNavigationProp<RootStackParamList, "CreateCategory">) => {
  const realm = useRealm();
  const { appConfig } = useContext(AppConfigContext);

  const [category, setCategory] = useState<Partial<ICategory>>();

  const onChange = (key: string, value: any) => {
    setCategory((previouValue) => ({
      ...previouValue,
      [key]: value
    }));
  }

  const onButtonPress = () => {
    if(!category?.name){
      Alert.alert("Please fill the category's name");
      return;
    }

    if(!category?.iconId){
      Alert.alert("Please select the icon");
      return;
    }

    if(!category?.budget){
      Alert.alert("Please fill the category's budget");
      return;
    }

    const pattern = /^-?\d+(\.\d+)?$/;
    if(!pattern.test(category.budget.toString())){
      Alert.alert("Please fill only numbers in the budget field");
      return;
    }

    realm.write(() => {
      const newCategory = realm.create<Category>('Category', { 
        name: category.name!,
        iconId: parseInt(category.iconId!.toString()),
        budget: parseInt(category.budget!.toString())
      });

      realm.create('Balance', { 
        category: newCategory,
        balance: 0,
        totalExpenses: 0,
        dueDate: appConfig.dateToRenewBalance
      });
    });

    navigation.goBack();
  }

  return {
    category,
    onChange,
    onButtonPress
  }
}

export default useCreateCategory;