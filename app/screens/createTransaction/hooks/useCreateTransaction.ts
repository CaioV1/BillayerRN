import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Category from "../../../models/schemas/CategorySchema";
import ITransaction from '../../../models/interfaces/Transaction';
import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import { getDefaultDatetimeFormatText } from "../../../utils/date.util";

const { useRealm, useQuery } = RealmContext;

const useCreateTransaction = (navigation: NativeStackNavigationProp<RootStackParamList, "CreateTransaction", undefined>) => {
  const [transaction, setTransaction] = useState<Partial<ITransaction>>();
  const realm = useRealm();
  const listCategory = useQuery(Category);

  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  const onChange = (key: string, value: any) => {
    setTransaction((previouValue) => ({
      ...previouValue,
      [key]: value
    }));
  }

  const onCategorySelected = (_id: string) => {
    const category = listCategory.find((category) => category._id.toString() === _id);

    if(category) setTransaction((previouValue) => ({
      ...previouValue,
      category
    }));
  }

  const onButtonPress = () => {
    if(!transaction?.name){
      Alert.alert("Please fill the name field");
      return;
    }

    if(!transaction?.value){
      Alert.alert("Please fill the value field");
      return;
    }

    if(!transaction?.category){
      Alert.alert("Please select a category");
      return;
    }

    const pattern = /^-?\d+(\.\d+)?$/;
    if(!pattern.test(transaction.value.toString())){
      Alert.alert("Please fill only numbers in the value field");
      return;
    }

    realm.write(() => {
      realm.create('Transaction', { 
        _id: new Realm.BSON.ObjectID(),
        name: transaction.name!,
        value: parseFloat(transaction.value!.toString()),
        category: transaction.category,
        createdAt: getDefaultDatetimeFormatText(new Date())
      })
    });

    navigation.goBack();
  }

  return {
    transaction,
    listCategory,
    onCategorySelected,
    onChange,
    onButtonPress  
  }
}

export default useCreateTransaction;