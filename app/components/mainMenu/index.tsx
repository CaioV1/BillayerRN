import React, { useContext } from "react";
import { Alert, ScrollView, Share } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { styles } from "./styles";
import ImageButton from "../imageButton";
import { getNextMonthDate } from "../../utils/date.util";
import { listMenu } from "../../resources/static/menuBalance";

import { RealmContext } from "../../configs/RealmContext";
import { AppConfigContext } from "../../context/appConfig.context";

import Transaction from "../../models/schemas/TransactionSchema";
import RootStackParamList from "../../models/interfaces/RootScreensParams"


interface MainMenuProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Balance' | 'BalanceHistory' | 'Transactions' | 'DetailCategory'>;
}

const { useQuery } = RealmContext;

const MainMenu: React.FC<MainMenuProps> = ({ navigation }) => {
  const { appConfig, createNewBalances } = useContext(AppConfigContext);
  const listTransactions = useQuery(Transaction);

  const onRenewButtonPress = () => {
    if(getNextMonthDate() === appConfig.dateToRenewBalance){
      Alert.alert('Balance already renewed today. Try again tomorrow.');
      return;
    }
    Alert.alert('Confirm renewal?', 'This function will reset the balances of expenses.', [
      {text: 'Yes', onPress: () => createNewBalances()},
      {text: 'No', onPress: () => {}},
    ]);
  }

  const onExportBalancePress = async () => {
    if(listTransactions.length === 0){
      Alert.alert('There is no data to export');
      return;
    }
    await Share.share({ message: JSON.stringify(listTransactions.toJSON()) })
  }

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.flatListMenu}>
      <ImageButton buttonTitle='List Transaction' imageBase64={listMenu[0].data} onPress={() => navigation.navigate('Transactions')} />
      <ImageButton buttonTitle='Balance History' imageBase64={listMenu[3].data} onPress={() => navigation.navigate('BalanceHistory')} />
      <ImageButton buttonTitle='Add Transaction' imageBase64={listMenu[2].data} onPress={() => navigation.navigate('CreateTransaction', {})} />
      <ImageButton buttonTitle='Add Category' imageBase64={listMenu[1].data} onPress={() => navigation.navigate('CreateCategory', {})} />
      <ImageButton buttonTitle='Renew Balance' imageBase64={listMenu[4].data} onPress={onRenewButtonPress} />
      <ImageButton buttonTitle='Export Balances' imageBase64={listMenu[7].data} onPress={onExportBalancePress} />
    </ScrollView>
  )
}

export default MainMenu;