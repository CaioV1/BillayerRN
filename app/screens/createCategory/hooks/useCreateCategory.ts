import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ICategory from '../../../models/interfaces/Category';
import Category from "../../../models/schemas/CategorySchema";
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { AppConfigContext } from "../../../context/appConfig.context";

const { useRealm } = RealmContext;

const useCreateCategory = ({route, navigation}: NativeStackScreenProps<RootStackParamList, 'CreateCategory'>) => {
  const paramCategory = route.params?.category;

  const realm = useRealm();
  const { appConfig } = useContext(AppConfigContext);

  const [category, setCategory] = useState<Partial<ICategory>>();

  useEffect(() => {
    paramCategory && setCategory(paramCategory);
  }, []);

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
      const categoryToRealm = { 
        name: category.name!,
        iconId: parseInt(category.iconId!.toString()),
        budget: parseInt(category.budget!.toString())
      };

      if(paramCategory){
        realm.create<Category>('Category', { ...categoryToRealm, _id: paramCategory._id }, true);
        return 
      }
      
      const newCategory = realm.create<Category>('Category', categoryToRealm);

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
    paramCategory,
    category,
    onChange,
    onButtonPress
  }
}

export default useCreateCategory;