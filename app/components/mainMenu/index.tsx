import React, { useContext } from "react";
import { Alert, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { styles } from "./styles";
import ImageButton from "../imageButton";
import { getNextMonthDate } from "../../utils/date.util";
import { listMenu } from "../../resources/static/menuBalance";
import { AppConfigContext } from "../../context/appConfig.context";
import RootStackParamList from "../../models/interfaces/RootScreensParams"

interface MainMenuProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Balance' | 'BalanceHistory' | 'Transactions' | 'DetailCategory'>;
}

const MainMenu: React.FC<MainMenuProps> = ({ navigation }) => {
  const { appConfig, createNewBalances } = useContext(AppConfigContext);

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

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.flatListMenu}>
      <ImageButton buttonTitle='List Transaction' imageBase64={listMenu[0].data} onPress={() => navigation.navigate('Transactions')} />
      <ImageButton buttonTitle='Balance History' imageBase64={listMenu[3].data} onPress={() => navigation.navigate('BalanceHistory')} />
      <ImageButton buttonTitle='Add Transaction' imageBase64={listMenu[2].data} onPress={() => navigation.navigate('CreateTransaction', {})} />
      <ImageButton buttonTitle='Add Category' imageBase64={listMenu[1].data} onPress={() => navigation.navigate('CreateCategory', {})} />
      <ImageButton buttonTitle='Renew Balance' imageBase64={listMenu[4].data} onPress={() => onRenewButtonPress()} />
    </ScrollView>
  )
}

export default MainMenu;