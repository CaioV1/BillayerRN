import React from "react"
import { Image, Text, View } from "react-native";
import styles from "./styles";

interface ItemFlatListProps {
  title: string;
  datetime: string;
  value: string;
  icon: string;
}

const ItemFlatList: React.FC<ItemFlatListProps> = ({title, value, icon, datetime}) => (
  <View style={styles.mainContainer}>
    <View style={styles.iconView}>
      <Image style={styles.iconImage} source={require('../../../public/uber_logo.png')} />
    </View>
    <View style={styles.titleDateView}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.datetimeText}>{datetime}</Text>
    </View>
    <View style={styles.valueView}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </View>
)

export default ItemFlatList;