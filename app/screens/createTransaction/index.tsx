import React from 'react';
import { Text, View } from 'react-native';
import { Input, Select } from "native-base";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import RootStackParamList from '../../models/interfaces/RootScreensParams';

import { styles } from './styles';

import { BottomButton } from '../../components';
import useCreateTransaction from './hooks/useCreateTransaction';

type CreateTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>;

const CreateTransactionScreen: React.FC<CreateTransactionScreenProps> = ({ navigation }) => {
  const { listBalance, onCategorySelected, onChange, onButtonPress } = useCreateTransaction(navigation);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.screenTopText}>
        Fill the fields to add a transaction
      </Text>
      <Input 
        fontSize={20} 
        marginTop={10} 
        marginX={5}
        variant="underlined" 
        placeholder="Name" 
        onChangeText={(text: string) => onChange('name', text)}
      />
      <Input 
        fontSize={20} 
        marginTop={10}
        marginX={5}
        variant="underlined" 
        placeholder="Value" 
        keyboardType='numeric'
        returnKeyType='done'
        onChangeText={(text: string) => onChange('value', text)} 
      />
      {
          listBalance && 
          <Select 
            fontSize={20}
            marginTop={10}
            marginX={5}
            accessibilityLabel="Category" 
            placeholder="Category" 
            variant="underlined"
            onValueChange={itemValue => onCategorySelected(itemValue)}
          >
              {
                listBalance.map((balance) => 
                  <Select.Item key={balance._id.toString()} label={balance.category.name} value={balance._id.toString()} />
                )
              }
          </Select>
        }
        <BottomButton title='Create' onButtonPress={onButtonPress} />
    </View>
  )
}

export default CreateTransactionScreen;