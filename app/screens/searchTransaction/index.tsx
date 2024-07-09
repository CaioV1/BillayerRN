import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Input } from "native-base";
import { Results } from "realm/dist/bundle";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams";

import { ItemFlatList, SectionHeader } from "../../components";
import useTransaction from "../../hooks/useTransaction";
import { convertToMoney } from "../../utils/string.util";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import { styles } from './styles';

const SEARCH_TEXT_MINIMUM_LENGTH = 2;

type SearchTransactionProps = NativeStackScreenProps<RootStackParamList, 'SearchTransaction'>;

const SearchTransaction: React.FC<SearchTransactionProps> = ({ navigation }) => {
  const { listTransaction } = useTransaction();

  const [searchValue, setSearchValue] = useState<string>('');

  const filteredList: Results<Transaction> | undefined = useMemo(() => {
    if(searchValue === '.') return listTransaction;
    return searchValue.length > SEARCH_TEXT_MINIMUM_LENGTH ? listTransaction.filtered('name CONTAINS[c] $0 ', searchValue) : undefined;
  }, [searchValue])

  const totalValue: number = useMemo(() => {
    return filteredList && filteredList.length > 1 ? filteredList.reduce((acc, transaction) => acc + transaction.value ,0) : 0;
   }, [filteredList])

  const renderItem = (transaction: Transaction) => (
    <TouchableOpacity key={transaction._id!.toString()} onPress={() => navigation.navigate('DetailTransaction', { transaction })}>
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
        Fill the field to search transactions
      </Text>
      <Input
        fontSize={20} 
        marginTop={5}
        marginBottom={2}
        marginX={5}
        variant="underlined" 
        placeholder="Value" 
        keyboardType='numeric'
        returnKeyType='done'
        onChangeText={(text: string) => setSearchValue(text)} 
      />
      {
        filteredList && filteredList.length > 0 && 
        <>
          {totalValue > 0 && <SectionHeader title='Total' value={convertToMoney(totalValue)}/>}
          <FlatList
            showsVerticalScrollIndicator={false} 
            data={filteredList}
            renderItem={({item}) => renderItem(item)}
          />
        </>
      }
      {
        (!filteredList || filteredList.length === 0) && searchValue.length > SEARCH_TEXT_MINIMUM_LENGTH &&
        <Text style={styles.infoMessage}>
          No transaction found
        </Text>
      }
    </View>
  );
}

export default SearchTransaction;