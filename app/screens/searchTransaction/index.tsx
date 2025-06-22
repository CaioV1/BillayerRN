import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams";

import { ItemFlatList, SearchInput } from "../../components";
import useTransaction from "../../hooks/useTransaction";
import { convertToMoney } from "../../utils/string.util";

import { styles } from './styles';

type SearchTransactionProps = NativeStackScreenProps<RootStackParamList, 'SearchTransaction'>;

const SearchTransaction: React.FC<SearchTransactionProps> = ({ navigation }) => {
  const { 
    filteredList, 
    totalValue, 
    searchValue, 
    setSearchValue 
  } = useTransaction();

  const renderItem = (transaction: Transaction) => (
    <TouchableOpacity key={transaction._id!.toString()} onPress={() => navigation.navigate('DetailTransaction', { transaction })}>
      <ItemFlatList 
        title={transaction.name} 
        value={convertToMoney(transaction.value)} 
        icon={transaction.balance.category.iconId.toString()}
        subtitle={transaction.createdAt} 
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.screenTopText}>
        Fill the field to search transactions
      </Text>
      <SearchInput
        searchValue={searchValue}
        listItems={filteredList}
        totalValue={totalValue}
        renderListItem={renderItem}
        onChange={(text: string) => setSearchValue(text)}
      />
    </View>
  );
}

export default SearchTransaction;