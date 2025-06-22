import React from "react"
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Material from 'react-native-vector-icons/MaterialIcons';

import useStyle from "./styles";
import { DEFAULT_CATEGORY_ICONS } from "../../resources/values/consts";

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
}) => {
  const styles = useStyle();
  const { colors } = useTheme();

  return (
    <View style={styles.mainContainer}>
    <View style={styles.iconView}>
      <Material name={DEFAULT_CATEGORY_ICONS.find((image) => image.id.toString() === icon)?.name || 'error'} size={30} color={colors.text} />
      {/* <Image style={styles.iconImage} source={icon ? {uri: icon} : require('../../../public/not_found.png')} /> */}
    </View>
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{title}</Text>
      { subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
    </View>
    <View style={styles.valueView}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </View>
  )
}

export default ItemFlatList;