import React from "react"
import { Image, Text, View } from "react-native";

import styles from "./styles";
import { DEFAULT_BLACK } from "../../resources/values/colors";

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
  titleColor = DEFAULT_BLACK, 
  subtitleColor = DEFAULT_BLACK,
  valueColor = DEFAULT_BLACK,
}) => (
  <View style={styles.mainContainer}>
    <View style={styles.iconView}>
      <Image style={styles.iconImage} source={icon ? {uri: icon} : require('../../../public/not_found.png')} />
    </View>
    <View style={styles.titleView}>
      <Text style={{...styles.titleText, color: titleColor}}>{title}</Text>
      { subtitle && <Text style={{...styles.subtitleText, color: subtitleColor}}>{subtitle}</Text>}
    </View>
    <View style={styles.valueView}>
      <Text style={{...styles.valueText, color: valueColor}}>{value}</Text>
    </View>
  </View>
)

export default ItemFlatList;