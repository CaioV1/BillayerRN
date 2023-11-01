import React from 'react';
import { CheckIcon, Select } from "native-base";
import { Button, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import RootStackParamList from '../../models/interfaces/RootScreensParams';

import { styles } from '../../resources/styles/form.style';

import useCreateTransaction from './hooks/useCreateTransaction';
import Category from '../../models/interfaces/Category';

type CreateTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>;

const CreateTransactionScreen: React.FC<CreateTransactionScreenProps> = ({ navigation }) => {
  const { listCategory, onCategorySelected, onChange, onButtonPress } = useCreateTransaction(navigation);

  return (
    <View>
      <TextInput style={styles.inputText} placeholder='Transaction title' onChangeText={(text: string) => onChange('name', text)} />
      <TextInput style={styles.inputText} placeholder='Transaction value' onChangeText={(text: string) => onChange('value', text)} keyboardType='numeric'/>
      <View style={{paddingHorizontal: 10}} >
        <Select 
          mt={1}
          minWidth="200"
          height="10"
          borderColor='#000000'
          accessibilityLabel="Choose category" 
          placeholder="Choose category" 
          onValueChange={itemValue => onCategorySelected(itemValue)}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}>
            {
              listCategory.map((category) => 
                <Select.Item label={category.name} value={category._id.toString()} />
              )
            }
        </Select>
      </View>
      <Button title='Register' onPress={onButtonPress}/>
    </View>
  )
}

export default CreateTransactionScreen;