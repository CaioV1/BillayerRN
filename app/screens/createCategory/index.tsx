import React from "react";
import { Input, ScrollView } from "native-base";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import ImageBase64 from "../../models/interfaces/ImageBase64";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { BottomButton, ImageSelector } from "../../components";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import { useStyles } from "./styles";
import useCreateCategory from "./hooks/useCreateCategory";

type CreateCategoryScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateCategory'>;

const CreateCategoryScreen: React.FC<CreateCategoryScreenProps> = ({ route, navigation }) => {
  const styles = useStyles();
  const { paramCategory, category, onChange, onButtonPress } = useCreateCategory({ route, navigation });
  
  return (
    <View style={styles.viewContainer}>
      <ScrollView style={{marginBottom: 80}} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTopText}>
          Fill the fields to { paramCategory ? 'update' : 'create' } the category
        </Text>
        <Input
          fontSize={20} 
          marginTop={10} 
          marginX={5}
          value={category?.name}
          variant="underlined" 
          placeholder="Name" 
          onChangeText={(text: string) => onChange('name', text)}
        />
        <Input 
          fontSize={20} 
          marginTop={10}
          marginBottom={30}
          marginX={5}
          value={category?.budget?.toString()}
          variant="underlined" 
          placeholder="Budget" 
          keyboardType='numeric'
          returnKeyType='done'
          onChangeText={(text: string) => onChange('budget', text)} 
        />
        <ImageSelector listImageInfo={listImgBase64} selectedImage={listImgBase64.find((item) => item.id === paramCategory?.iconId)} onPress={(item: ImageBase64) => onChange('iconId', item.id)} />
      </ScrollView>
      <BottomButton title={paramCategory ? 'Update' : 'Create'} onButtonPress={onButtonPress} />
    </View>
  )
}

export default CreateCategoryScreen;