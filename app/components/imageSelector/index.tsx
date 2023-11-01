import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import ImageBase64 from "../../models/interfaces/ImageBase64";

interface ImageSelectorProps {
  listImageInfo: Array<ImageBase64>;
  onPress: (imageInfo: ImageBase64) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ listImageInfo, onPress }) => {
  const [imageSelected, setImageSelected] = useState<ImageBase64>()

  const onImageSelected = (item: ImageBase64) => {
    setImageSelected(item);
    onPress(item);
  }

  const renderImages = (item: ImageBase64) => {
    const imageViewStyle = imageSelected?.id === item.id ? { ...styles.imageView, backgroundColor: '#fccf65' } : styles.imageView;

    return (
      <TouchableOpacity onPress={() => { onImageSelected(item) }}>
        <View key={item.id} style={imageViewStyle}>
          <Image style={styles.image} source={{ uri: item.data }} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.componentView}>
      <Text style={styles.textStyle}>Pick an icon</Text>
      <FlatList showsVerticalScrollIndicator={false} data={listImageInfo} numColumns={2} renderItem={({item}) => renderImages(item)}/>
    </View>
  )
}

export default ImageSelector;