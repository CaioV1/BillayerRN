import React from "react";
import { Button, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import ImageBase64 from "../../models/interfaces/ImageBase64";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { ImageSelector } from "../../components";

import { styles } from "../../resources/styles/form.style";
import { listImgBase64 } from "../../resources/static/imgBase64";

import useCreateCategory from "./hooks/useCreateCategory";

type CreateCategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateCategory'>;

const CreateCategoryScreen: React.FC<CreateCategoryScreenProps> = ({ navigation }) => {
  const { onChange, onButtonPress } = useCreateCategory(navigation);
  return (
    <View style={{flex: 1, marginVertical: 20}}>
      <TextInput style={styles.inputText} placeholder='Category name' onChangeText={(text: string) => onChange('name', text)} />
      <TextInput style={styles.inputText} placeholder='Category budget' onChangeText={(text: string) => onChange('budget', text)} keyboardType='numeric'/>
      <ImageSelector listImageInfo={listImgBase64} onPress={(item: ImageBase64) => onChange('iconId', item.id)} />
      <Button title='Register' onPress={onButtonPress}/>
    </View>
  )
}

export default CreateCategoryScreen;