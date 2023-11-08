import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { styles } from "./styles";
import { DEFAULT_BLACK } from "../../resources/values/colors";

interface SectionHeaderProps {
  title: string;
  value?: string;
  valueColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, value, valueColor = DEFAULT_BLACK }) => (
  <View style={styles.viewContainer}>
    <Text style={styles.text}>
      {title}
    </Text>
    { 
      value && 
      <Text style={{...styles.text, color: valueColor}}>
        {value}
      </Text>
    }
    
  </View>
)

export default SectionHeader;