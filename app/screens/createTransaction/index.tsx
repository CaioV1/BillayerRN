import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RealContext } from '../../configs/RealmContext';

import ITransaction from '../../models/interfaces/Transaction';
import Transaction from '../../models/schemas/TransactionSchema';
import RootStackParamList from '../../models/interfaces/RootScreensParams';
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
    console.log(transaction)
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

    console.log(typeof transaction.value)

    console.log('isNaN', Number.isNaN(transaction.value))

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
      <TextInput style={styles.inputText} placeholder='Transaction title' onChangeText={(text: string) => onChange('name', text)} />
      <TextInput style={styles.inputText} placeholder='Transaction value' onChangeText={(text: string) => onChange('value', text)} keyboardType='numeric'/>
      <TextInput style={styles.inputText} placeholder='Category ID' onChangeText={(text: string) => onChange('categoryId', text)} keyboardType='numeric'/>
      <Button title='Register' onPress={onButtonPress}/>
    </View>
  )
}

export default CreateTransactionScreen;