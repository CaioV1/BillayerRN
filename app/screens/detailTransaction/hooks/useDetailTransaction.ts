import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import RootStackParamList from "../../../models/interfaces/RootScreensParams";

import { RealmContext } from "../../../configs/RealmContext";
import Balance from "../../../models/schemas/BalanceSchema";

const { useRealm } = RealmContext;

const useDetailTransaction = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DetailTransaction'>) => {
  const { transaction } = route.params;

  const realm = useRealm();

  const deleteTransaction = () => {
    try {
      realm.write(() => {
        const balance = realm.objectForPrimaryKey<Balance>('Balance', transaction.balance._id);
        balance!.totalExpenses = transaction.balance.totalExpenses - transaction.value;
        realm.delete(transaction);
      });
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