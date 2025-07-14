import React from "react"
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Material from 'react-native-vector-icons/MaterialIcons';

import useStyle from "./styles";

interface ItemFlatListProps {
  title: string;
  subtitle?: string;
  value: string;
  icon?: string;
  titleColor?: string;
  subtitleColor?: string;
  valueColor?: string;
}

const ItemFlatList: React.FC<ItemFlatListProps> = ({
  title, 
  value, 
  icon, 
  subtitle, 
  valueColor
}) => {
  const styles = useStyle();
  const { colors } = useTheme();

  return (
    <View style={styles.mainContainer}>
    <View style={styles.iconView}>
      <Material name={icon!} size={30} color={colors.text} />
    </View>
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{title}</Text>
      { subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
    </View>
    <View style={styles.valueView}>
      <Text style={{...styles.valueText, color: valueColor || colors.text}}>{value}</Text>
    </View>
  </View>
  )
}

export default ItemFlatList;