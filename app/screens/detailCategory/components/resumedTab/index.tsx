import React from "react";
import { FlatList, View } from "react-native";
import { Results } from "realm/dist/bundle";

import Balance from "../../../../models/schemas/BalanceSchema";
import { convertToMoney } from "../../../../utils/string.util";
import { ItemFlatList, SectionHeader } from "../../../../components";
import { listImgBase64 } from "../../../../resources/static/categoriesImages";

interface ResumedTabComponentProps {
  filteredBalanceList: Results<Balance>;
  allExpensesResult: number
}

const ResumedTabComponent: React.FC<ResumedTabComponentProps> = ({ filteredBalanceList, allExpensesResult }) => {
  const renderItem = (item: Balance) => (
    <ItemFlatList 
      key={item._id!.toString()}
      title={item.dueDate} 
      value={convertToMoney(item.totalExpenses)} 
      icon={listImgBase64.find((imgBase64) => imgBase64.id === item.category.iconId)?.data}
    />
  )

  return (
    <View style={{ paddingBottom: 750 }}>
      <SectionHeader title='Total' value={convertToMoney(allExpensesResult)}/>
      <FlatList 
        showsVerticalScrollIndicator={false} 
        data={Array.from(filteredBalanceList).reverse()} 
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

export default ResumedTabComponent;