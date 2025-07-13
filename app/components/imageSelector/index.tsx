import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { Input } from 'native-base';

import { useStyle } from './styles';
import { DEFAULT_CATEGORY, SEARCH_TEXT_MINIMUM_LENGTH } from '../../resources/values/consts';

interface ImageSelectorProps {
  selectedIcon?: number | string;
  onPress: (imageInfo: string) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ selectedIcon, onPress }) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const [imageSelected, setImageSelected] = useState<string>()
  const [listImages, setListImage] = useState<string[]>([]);
  const [searchIcon, setSearchIcon] = useState<string>('');

  useEffect(() => {
    if(typeof selectedIcon === 'number') setImageSelected(DEFAULT_CATEGORY.find(category => category.iconId === selectedIcon)?.iconName);
    if(typeof selectedIcon === 'string') setImageSelected(selectedIcon);
  }, [])

  useEffect(() => {
    if(searchIcon.length > SEARCH_TEXT_MINIMUM_LENGTH) setListImage(Object.keys(Material.getRawGlyphMap()).filter(item => item.includes(searchIcon.toLowerCase().replace(' ', '-'))))
  }, [searchIcon])

  const onImageSelected = (item: string) => {
    setImageSelected(item);
    onPress(item);
  }

  const renderIcons = (item: string) => {
    const imageViewStyle = imageSelected === item ? { ...styles.imageView, backgroundColor: colors.text } : styles.imageView;

    return (
      <TouchableOpacity onPress={() => { onImageSelected(item) }}>
        <View style={imageViewStyle}>
          <Material name={item} size={50} color={imageSelected === item ? colors.card : colors.text} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Input
        fontSize={20} 
        marginTop={10} 
        marginBottom={5} 
        marginX={5}
        value={searchIcon}
        variant="underlined" 
        placeholder="Search icon" 
        onChangeText={(text: string) => setSearchIcon(text)}
      />
      <View style={styles.componentView}>
        {
          searchIcon.length > SEARCH_TEXT_MINIMUM_LENGTH ? listImages.map(image => renderIcons(image)) : DEFAULT_CATEGORY.map(category => renderIcons(category.iconName!))
        }
      </View>
    </>
  )
}

export default ImageSelector;