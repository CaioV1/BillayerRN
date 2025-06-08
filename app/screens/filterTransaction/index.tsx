import React from "react";
import { FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { Input, Select } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams";

import { convertToMoney } from "../../utils/string.util";

import { listImgBase64 } from "../../resources/static/categoriesImages";

import { BottomButton, ItemFlatList, SectionHeader } from "../../components";

import { styles } from "./styles";
import useFilter from "./hooks/useFilter";

type FilterTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterTransaction'>;

const FilterTransaction: React.FC<FilterTransactionScreenProps> = ({ navigation }) => {
  const { 
    hasPressed,
    formValues,
    totalValue,
    filteredList,
    listBalance, 
    listMonths, 
    listYears, 
    onChange,
    onClickButton 
  } = useFilter();

  const getSelectBalanceItens = () => listBalance && listBalance.map((balance) => 
    <Select.Item key={balance.category._id!.toString()} label={balance.category.name} value={balance.category._id!.toString()} />
  )

  const getSelectMonthItens = () => listMonths && listMonths.map((month, i) => 
    <Select.Item key={i} label={month} value={`${i + 1}`.padStart(2, '0')} />
  )

  const getSelectYearItens = () => listYears && listYears.map((year, i) => 
    <Select.Item key={i} label={year.toString()} value={year.toString()} />
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
      <ScrollView>
        <Input 
          fontSize={20} 
          marginTop={8} 
          marginX={5}
          value={formValues?.transactionName}
          variant="underlined" 
          placeholder="Name" 
          onChangeText={(text: string) => onChange('transactionName', text)}
        /> 
        <Select 
          fontSize={20}
          marginTop={10}
          marginX={5}
          selectedValue={formValues?.month}
          accessibilityLabel="Month" 
          placeholder="Month" 
          variant="underlined"
          onValueChange={itemValue => onChange('month', itemValue)}
        >
          { getSelectMonthItens() }
        </Select>
        <Select 
          fontSize={20}
          marginTop={10}
          marginX={5}
          selectedValue={formValues?.year}
          accessibilityLabel="Year" 
          placeholder="Year" 
          variant="underlined"
          onValueChange={itemValue => onChange('year', itemValue)}
        >
          { getSelectYearItens() }
        </Select>
        <Select 
          fontSize={20}
          marginTop={10}
          marginBottom={5}
          marginX={5}
          selectedValue={formValues?.category}
          accessibilityLabel="Category" 
          placeholder="Category" 
          variant="underlined"
          onValueChange={itemValue => onChange('category', itemValue)}
        >
          { getSelectBalanceItens() }
        </Select>
        {
          filteredList && filteredList.length > 0 && 
          <>
            {totalValue > 0 && <SectionHeader title='Total' value={convertToMoney(totalValue)}/>}
            <FlatList
              style={styles.flatList}
              showsVerticalScrollIndicator={false} 
              data={Array.from(filteredList).reverse()}
              renderItem={({item}) => renderItem(item)}
            />
          </>
        }
        {
          (!filteredList || filteredList.length === 0) && hasPressed &&
          <Text style={styles.infoMessage}>
            No item found
          </Text>
        }
      </ScrollView>
      <BottomButton title="Filter Transaction" onButtonPress={() => {
        onClickButton();
      }}/>
    </>
  )
}

export default FilterTransaction;