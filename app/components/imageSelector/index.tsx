import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { DEFAULT_BUTTON_COLOR } from '../../resources/values/colors';

import ImageBase64 from "../../models/interfaces/ImageBase64";

interface ImageSelectorProps {
  listImageInfo: Array<ImageBase64>;
  selectedImage?: ImageBase64;
  onPress: (imageInfo: ImageBase64) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ listImageInfo, selectedImage, onPress }) => {
  const [imageSelected, setImageSelected] = useState<ImageBase64>()

  useEffect(() => {
    selectedImage && setImageSelected(selectedImage);
  }, [])

  const onImageSelected = (item: ImageBase64) => {
    setImageSelected(item);
    onPress(item);
  }

  const renderImages = (item: ImageBase64) => {
    const imageViewStyle = imageSelected?.id === item.id ? { ...styles.imageView, backgroundColor: DEFAULT_BUTTON_COLOR } : styles.imageView;

    return (
      <TouchableOpacity onPress={() => { onImageSelected(item) }} key={item.id}>
        <View key={item.id} style={imageViewStyle}>
          <Image style={styles.image} source={{ uri: item.data }} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.componentView}>
      <View>
        { listImageInfo.filter((_i, index) => index % 2 == 1).map((item) => renderImages(item)) }
      </View>
      <View>
        { listImageInfo.filter((_i, index) => index % 2 == 0).map((item) => renderImages(item)) }
      </View>
    </View>
  )
}

export default ImageSelector;