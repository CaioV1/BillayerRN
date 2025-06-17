import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';

import { useStyle } from './styles';
import { DEFAULT_BUTTON_COLOR } from '../../resources/values/colors';

import ImageBase64 from "../../models/interfaces/ImageBase64";
import { DEFAULT_CATEGORY_ICONS } from '../../resources/values/consts';

interface ImageSelectorProps {
  listImageInfo: Array<ImageBase64>;
  selectedImage?: ImageBase64;
  onPress: (imageInfo: ImageBase64) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ listImageInfo, selectedImage, onPress }) => {
  const styles = useStyle();
  const [imageSelected, setImageSelected] = useState<ImageBase64>()
  const [listImages, setListImage] = useState<string[]>([]);

  useEffect(() => {
    selectedImage && setImageSelected(selectedImage);
    setListImage(Object.keys(Material.getRawGlyphMap()).filter(item => item.includes('error')))
    // setListImage(DEFAULT_CATEGORY_ICONS.map(icon => icon.name))
  }, [])

  useEffect(() => {
    console.log(listImages)
  }, [listImages])

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
      {/* {
        listImages.map(image => (<Material name={image} size={50} color='#000000' />))
      } */}
    </View>
  )
}

export default ImageSelector;