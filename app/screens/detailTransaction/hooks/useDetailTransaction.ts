import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import * as transactionService from '../../../services/transaction.service';

const { useRealm } = RealmContext;

const useDetailTransaction = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DetailTransaction'>) => {
  const { transaction } = route.params;

  const realm = useRealm();

  const deleteTransaction = () => {
    try {
      transactionService.deleteTransaction(realm, transaction);
      navigation.goBack();
    } catch (error) {
      Alert.alert('An error has occurred while deleting the transaction');
      console.log(error);
    }
  }

  const onDeleteButtonPress = () => {
    Alert.alert('Confirm delete', 'This action will delete this transaction', [
      { text: 'Yes', onPress: () => { deleteTransaction() } },
      { text: 'No', onPress: () => {} }
    ])
  }
  
  return {
    transaction,
    onDeleteButtonPress
  }
}

export default useDetailTransaction;