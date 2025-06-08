import React from "react"
import { Text, View } from "react-native"

import { useStyle } from "./styles";
import { useTheme } from "@react-navigation/native";

interface SectionHeaderProps {
  title: string;
  value?: string;
  valueColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, value, valueColor }) => {
  const styles = useStyle();
  const { colors } = useTheme();

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.text}>
        {title}
      </Text>
      { 
        value && 
        <Text style={{...styles.text, color: valueColor || colors.text }}>
          {value}
        </Text>
      }
      
    </View>
  )
}

export default SectionHeader;