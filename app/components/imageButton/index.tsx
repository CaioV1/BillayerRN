import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useStyle } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from "@react-navigation/native";

interface ImageButtonProps {
  buttonTitle: string;
  imageName?: string;
  imageBase64?: string;
  size?: number;
  onPress: () => void;
  lastItem?: boolean;
}

const ImageButton: React.FC<ImageButtonProps> = ({ buttonTitle, imageName, imageBase64, size = 40, onPress, lastItem = false }) => {
  const styles = useStyle();
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.componentView, marginRight: lastItem ? 20 : 0 }}>
      <View style={styles.imageView}>
        { imageName &&  <Material name={imageName} size={size} color={colors.text} />}
        { imageBase64 && <Image style={styles.image} source={imageBase64 ? {uri: imageBase64} : require('../../../public/not_found.png')} /> }
      </View>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ImageButton;