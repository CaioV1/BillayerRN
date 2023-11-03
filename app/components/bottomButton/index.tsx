import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { styles } from "./styles";

interface BottomButtonProps {
  title: string;
  onButtonPress: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({ title, onButtonPress }) => (
  <TouchableOpacity style={styles.touchable} onPress={onButtonPress}>
    <View style={styles.viewContainer}>
      <Text style={styles.text}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
)

export default BottomButton;