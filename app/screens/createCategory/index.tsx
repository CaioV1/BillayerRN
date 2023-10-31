import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { RealContext } from "../../configs/RealmContext";
import { styles } from "../../resources/styles/form.style";

import ICategory from '../../models/interfaces/Category';
import RootStackParamList from "../../models/interfaces/RootScreensParams"

const { useRealm } = RealContext;

type CreateCategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateCategory'>;

const CreateCategoryScreen: React.FC<CreateCategoryScreenProps> = ({ navigation }) => {
  const realm = useRealm();

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

    // if(!category?.iconId){
    //   Alert.alert("Please select the icon");
    //   return;
    // }

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
      realm.create('Category', { 
        _id: new Realm.BSON.ObjectID(),
        name: category.name!,
        iconId: 1,
        budget: parseInt(category.budget!.toString())
      })
    });

    navigation.goBack();
  }

  return (
    <View>
      <TextInput style={styles.inputText} placeholder='Category name' onChangeText={(text: string) => onChange('name', text)} />
      <TextInput style={styles.inputText} placeholder='Category budget' onChangeText={(text: string) => onChange('budget', text)} keyboardType='numeric'/>
      <Button title='Register' onPress={onButtonPress}/>
    </View>
  )
}

export default CreateCategoryScreen;