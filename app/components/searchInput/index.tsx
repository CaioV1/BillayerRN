import React from "react";
import { Text } from "react-native";
import { Results } from "realm/dist/bundle";
import { FlatList, Input } from "native-base";

import SectionHeader from "../sectionHeader";
import { convertToMoney } from "../../utils/string.util";
import { SEARCH_TEXT_MINIMUM_LENGTH } from "../../resources/values/consts";

import { styles } from "./styles";

interface SearchInputProps {
  searchValue: string;
  onChange: (value: string) => void;
  renderListItem: (item: any) => JSX.Element;
  placeholder?: string;
  totalValue?: number;
  listItems?: Results<any>;
  flatListStyle?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  searchValue, 
  onChange, 
  renderListItem, 
  listItems, 
  flatListStyle,
  placeholder = 'Value',
  totalValue = 0
}) => {
  return (
    <>
      <Input
        fontSize={20} 
        marginTop={5}
        marginBottom={2}
        marginX={5}
        value={searchValue}
        variant="underlined" 
        placeholder={placeholder}
        returnKeyType='done'
        onChangeText={onChange} 
      />
      {
        listItems && listItems.length > 0 && 
        <>
          {totalValue > 0 && <SectionHeader title='Total' value={convertToMoney(totalValue)}/>}
          <FlatList
            style={flatListStyle}
            showsVerticalScrollIndicator={false} 
            data={listItems}
            renderItem={({item}) => renderListItem(item)}
          />
        </>
      }
      {
        (!listItems || listItems.length === 0) && searchValue.length > SEARCH_TEXT_MINIMUM_LENGTH &&
        <Text style={styles.infoMessage}>
          No item found
        </Text>
      }
    </>
  )
}

export default SearchInput;