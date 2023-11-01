import React, { useState } from 'react';
import { CheckIcon, Select } from "native-base";
import { Alert, Button, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import ITransaction from '../../models/interfaces/Transaction';
import RootStackParamList from '../../models/interfaces/RootScreensParams';

import { RealContext } from '../../configs/RealmContext';

import { styles } from '../../resources/styles/form.style';

const { useRealm } = RealContext;

type CreateTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>;

const CreateTransactionScreen: React.FC<CreateTransactionScreenProps> = ({ navigation }) => {
  const [transaction, setTransaction] = useState<Partial<ITransaction>>();
  const realm = useRealm();

  const onChange = (key: string, value: any) => {
    setTransaction((previouValue) => ({
      ...previouValue,
      [key]: value
    }));
  }

  const onButtonPress = () => {
    if(!transaction?.name){
      Alert.alert("Please fill the transaction's name");
      return;
    }

    if(!transaction?.value){
      Alert.alert("Please fill the transaction's value");
      return;
    }

    if(!transaction?.categoryId){
      Alert.alert("Please fill the transaction's category ID");
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
        value: transaction.value!,
        categoryId: parseInt(transaction.categoryId!.toString()),
        createdAt: 'test'
      })
    });

    navigation.goBack();
  }

  return (
    <View>
      <Select 
        mt={1}
        minWidth="200" 
        accessibilityLabel="Choose Service" 
        placeholder="Choose Service" 
        onValueChange={itemValue => console.log(itemValue)}
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
      <TextInput style={styles.inputText} placeholder='Transaction title' onChangeText={(text: string) => onChange('name', text)} />
      <TextInput style={styles.inputText} placeholder='Transaction value' onChangeText={(text: string) => onChange('value', text)} keyboardType='numeric'/>
      <TextInput style={styles.inputText} placeholder='Category ID' onChangeText={(text: string) => onChange('categoryId', text)} keyboardType='numeric'/>
      <Button title='Register' onPress={onButtonPress}/>
    </View>
  )
}

export default CreateTransactionScreen;