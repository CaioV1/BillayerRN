import React from "react";
import { Image, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import Balance from "../../models/interfaces/Balance";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { listMenu } from "../../resources/static/menuBalance";
import { listImgBase64 } from "../../resources/static/categoriesImages";

import { convertToMoney } from "../../utils/string.util";
import { ImageButton } from "../../components";

import { useStyle } from "./styles";
import useDetailTransaction from "./hooks/useDetailTransaction";

type DetailTransactionProps = NativeStackScreenProps<RootStackParamList, 'DetailTransaction'>;

const DetailTransaction: React.FC<DetailTransactionProps> = ({ route, navigation }) => {
  const { appConfig, transaction, onDeleteButtonPress } = useDetailTransaction({ route, navigation });
  const styles = useStyle();

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeaderTexts}>
        <View style={styles.viewIcon}>
          <Image 
            style={styles.iconImage} 
            source={{ uri: listImgBase64.find((item) => item.id === transaction.balance.category.iconId)!.data }} 
          />
        </View>
        <Text style={styles.transactionNameText}>{transaction.name}</Text>
        <Text style={styles.transactionValueText}>{convertToMoney(transaction.value)}</Text>
        <Text style={styles.transactionValueText}>{transaction.createdAt}</Text>
      </View>
      <View style={styles.viewImageButtons}>
        {
          appConfig.dateToRenewBalance === transaction.balance.dueDate &&
          <ImageButton buttonTitle='Edit' imageBase64={listMenu[5].data} onPress={() => navigation.navigate('CreateTransaction', { transaction })} />
        }
        <ImageButton buttonTitle='Delete' imageBase64={listMenu[6].data} onPress={() => onDeleteButtonPress()} />
      </View>
    </View>
  )
}

export default DetailTransaction;