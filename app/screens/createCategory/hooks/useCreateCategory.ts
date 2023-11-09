import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ICategory from '../../../models/interfaces/Category';
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { AppConfigContext } from "../../../context/appConfig.context";
import { createCategory, updateCategory } from "../../../services/category.service";

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

  const validateFields = (): string | void => {
    if(!category?.name) return "Please fill the category's name";
    if(!category?.iconId) return "Please select the icon";
    if(!category?.budget) return "Please fill the category's budget";

    const pattern = /^-?\d+(\.\d+)?$/;
    if(!pattern.test(category.budget.toString())) return "Please fill only numbers in the budget field";
  }

  const onButtonPress = () => {
    const validationResult = validateFields();

    if(validationResult){
      Alert.alert(validationResult);
      return;
    }

    const newCategory: ICategory = {
      _id: paramCategory?._id,
      name: category!.name!,
      budget: category!.budget!,
      iconId: category!.iconId!
    }

    if(paramCategory){
      updateCategory(realm, paramCategory, newCategory);
    } else {
      createCategory(realm, newCategory, appConfig.dateToRenewBalance);
    }

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