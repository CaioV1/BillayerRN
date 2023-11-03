import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { convertToMoney } from "../../utils/string.util";

interface BalancePanelProps {
  budget: number;
  totalExpenses: number;
}

const BalancePanel: React.FC<BalancePanelProps> = ({ budget, totalExpenses }) => {
  const balance = budget - totalExpenses;
  return (
    <View style={styles.componentView}>
      <View>
        <Text style={styles.balanceTitle}>Balance</Text>
        <Text style={{...styles.balanceText, color: balance > 0 ? '#000000' : "red"}}>{convertToMoney(balance)}</Text>
      </View>
      <View>
        <Text style={styles.textStyle}>Budget <Text style={styles.boldTextStyle}>{convertToMoney(budget)}</Text></Text>
        <Text style={styles.textStyle}>Expenses <Text style={styles.boldTextStyle}>{convertToMoney(totalExpenses)}</Text></Text>
      </View>
    </View>
  )
}

export default BalancePanel;