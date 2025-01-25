import React, { useEffect, useState } from "react"
import { SectionList, TouchableOpacity } from "react-native"
import { SearchIcon } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import useTransaction from "../../hooks/useTransaction";
import { convertToMoney } from "../../utils/string.util";
import { BottomButton, ItemFlatList, SearchInput, SectionHeader } from "../../components";

import { listImgBase64 } from "../../resources/static/categoriesImages";
import { SEARCH_TEXT_MINIMUM_LENGTH } from "../../resources/values/consts";

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  const { 
    filteredList, 
    totalValue, 
    searchValue, 
    listTransaction, 
    setSearchValue,
    formatTransactionListToSection, 
    getBalanceFromTransactions 
  } = useTransaction();

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [formatedTransactionList, setFormatedTransactionList] = useState<Array<{title: string, data: Array<Transaction>}>>();

  useEffect(() => {
    setFormatedTransactionList(formatTransactionListToSection(listTransaction));
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <SearchIcon size='5' color='black' />
        </TouchableOpacity>
      )
    })
  }, []);

  const renderSectionHeader = (title: string, value: number) => (
    <SectionHeader title={title} value={convertToMoney(value)}/>
  )

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
    <>
      {
        showSearch && 
        <SearchInput
          placeholder="Search transactions"
          searchValue={searchValue}
          listItems={filteredList}
          totalValue={totalValue}
          renderListItem={renderItem}
          onClosePress={() => { setShowSearch(false); setSearchValue(''); }}
          onChange={(text: string) => setSearchValue(text)}
          flatListStyle={{ marginBottom: 80 }}
        />
      }
      {
        searchValue !== '.' && searchValue.length <= SEARCH_TEXT_MINIMUM_LENGTH && formatedTransactionList && formatedTransactionList.length > 0 && 
        <SectionList
          contentContainerStyle={{paddingBottom: 80}}
          showsVerticalScrollIndicator={false}
          sections={formatedTransactionList}
          keyExtractor={(item) => item._id.toString()}
          renderSectionHeader={({section }) => renderSectionHeader(section.title, getBalanceFromTransactions(section.data))}
          renderItem={({item}) => renderItem(item)}
        />
      }
      <BottomButton title="Add Transaction" onButtonPress={() => {
        navigation.navigate('CreateTransaction', {});
      }}/>
    </>
  )
}

export default TransactionsScreen;