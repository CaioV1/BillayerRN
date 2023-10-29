import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Button, Text, View } from "react-native"
import RootStackParamList from "../../models/RootScreensParams"

type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Título Transanções</Text>
      <Button title="Ir" onPress={() => {
        navigation.navigate('Balance');
      }}/>
    </View>
  )
}

export default TransactionsScreen;