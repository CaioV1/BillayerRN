import React from "react"
import { Image, Text, View } from "react-native";
import styles from "./styles";

interface ItemFlatListProps {
  title: string;
  subtitle: string;
  value: string;
  icon?: string;
}

const ItemFlatList: React.FC<ItemFlatListProps> = ({title, value, icon, subtitle}) => (
  <View style={styles.mainContainer}>
    <View style={styles.iconView}>
      <Image style={styles.iconImage} source={icon ? {uri: icon} : require('../../../public/not_found.png')} />
    </View>
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
    <View style={styles.valueView}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </View>
)

export default ItemFlatList;