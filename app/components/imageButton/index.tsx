import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ImageButtonProps {
  buttonTitle: string;
  imageBase64: string;
  onPress: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ buttonTitle, imageBase64, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.componentView}>
    <View style={styles.imageView}>
      <Image style={styles.image} source={imageBase64 ? {uri: imageBase64} : require('../../../public/not_found.png')} />
    </View>
    <View style={styles.textView}>
      <Text style={styles.textStyle}>{buttonTitle}</Text>
    </View>
  </TouchableOpacity>
)

export default ImageButton;