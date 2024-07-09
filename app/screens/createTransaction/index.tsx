import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Input, Select } from "native-base";
import { NativeStackScreenProps } from '@react-navigation/native-stack';


import Transaction from '../../models/schemas/TransactionSchema';
import RootStackParamList from '../../models/interfaces/RootScreensParams';

import { styles } from './styles';
import { convertToMoney } from '../../utils/string.util';
import useCreateTransaction from './hooks/useCreateTransaction';
import { listImgBase64 } from '../../resources/static/categoriesImages';
import { BottomButton, ItemFlatList, SearchInput } from '../../components';

type CreateTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateTransaction'>;

const CreateTransactionScreen: React.FC<CreateTransactionScreenProps> = ({ route, navigation }) => {
  const { 
    transaction, 
    listBalance, 
    paramTransaction, 
    searchValue, 
    filteredList,
    onPressSearchItem,
    setSearchValue,
    onCategorySelected, 
    onChange, 
    onButtonPress,
  } = useCreateTransaction({ route, navigation });

  const renderItem = (transaction: Transaction) => (
    <TouchableOpacity key={transaction._id!.toString()} onPress={() => onPressSearchItem(transaction)}>
      <ItemFlatList 
        title={transaction.name} 
        value={convertToMoney(transaction.value)} 
        icon={listImgBase64.find((imgBase64) => imgBase64.id === transaction.balance.category.iconId)?.data}
        subtitle={transaction.createdAt} 
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.screenTopText}>
        Fill the fields {paramTransaction ? 'to update' : 'or search and select a previous transaction'}
      </Text>
      {
        !paramTransaction && 
        <SearchInput
          placeholder='Search transaction'
          searchValue={searchValue}
          listItems={filteredList}
          flatListStyle={{ flexGrow: 0, maxHeight: 120 }}
          renderListItem={renderItem}
          onChange={(text: string) => { setSearchValue(text) }}
        />
      }
      <Input 
        fontSize={20} 
        marginTop={8} 
        marginX={5}
        value={transaction?.name}
        variant="underlined" 
        placeholder="Name" 
        onChangeText={(text: string) => onChange('name', text)}
      />
      <Input 
        fontSize={20} 
        marginTop={10}
        marginX={5}
        value={transaction?.value?.toString()}
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
            selectedValue={transaction?.balance?._id.toString()}
            accessibilityLabel="Category" 
            placeholder="Category" 
            variant="underlined"
            onValueChange={itemValue => onCategorySelected(itemValue)}
          >
              {
                listBalance.map((balance) => 
                  <Select.Item key={balance?._id.toString()} label={balance.category.name} value={balance._id.toString()} />
                )
              }
          </Select>
        }
        <BottomButton title={paramTransaction ? 'Update' : 'Create'} onButtonPress={onButtonPress} />
    </View>
  )
}

export default CreateTransactionScreen;