import React from "react";
import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useTheme } from "@react-navigation/native";
import Material from 'react-native-vector-icons/MaterialIcons';

import RootStackParamList from "../../models/interfaces/RootScreensParams"

import { convertToMoney } from "../../utils/string.util";
import { ImageButton } from "../../components";

import { useStyle } from "./styles";
import useDetailTransaction from "./hooks/useDetailTransaction";
import { DEFAULT_CATEGORY_ICONS } from "../../resources/values/consts";

type DetailTransactionProps = NativeStackScreenProps<RootStackParamList, 'DetailTransaction'>;

const DetailTransaction: React.FC<DetailTransactionProps> = ({ route, navigation }) => {
  const styles = useStyle();
  const { colors } = useTheme();
  const { appConfig, transaction, onDeleteButtonPress } = useDetailTransaction({ route, navigation });

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeaderTexts}>
        <View style={styles.viewIcon}>
          <Material name={DEFAULT_CATEGORY_ICONS.find(image => image.id === transaction.balance.category.iconId)?.name || 'error'} size={40} color={colors.text} />
        </View>
        <Text style={styles.transactionNameText}>{transaction.name}</Text>
        <Text style={styles.transactionValueText}>{convertToMoney(transaction.value)}</Text>
        <Text style={styles.transactionValueText}>{transaction.createdAt}</Text>
      </View>
      <View style={styles.viewImageButtons}>
        {
          appConfig.dateToRenewBalance === transaction.balance.dueDate &&
          <ImageButton buttonTitle='Edit' imageName='edit' onPress={() => navigation.navigate('CreateTransaction', { transaction })} />
        }
        <ImageButton buttonTitle='Delete' imageName='delete' onPress={() => onDeleteButtonPress()} />
      </View>
    </View>
  )
}

export default DetailTransaction;