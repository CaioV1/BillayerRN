import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { useColorMode } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { styles } from "./styles";
import { ThemeContext } from "../../../../context/theme.context";

import ImageButton from "../../../../components/imageButton";
import RootStackParamList from "../../../../models/interfaces/RootScreensParams"

interface MainMenuProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Balance' | 'BalanceHistory' | 'Transactions' | 'DetailCategory'>;
  importBalances: () => void;
  onRenewButtonPress: () => void;
  onExportButtonPress: () => void;
  onImportButtonPress: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ 
  navigation, 
  onRenewButtonPress, 
  onExportButtonPress,
  onImportButtonPress 
}) => {
  const { setScheme } = useContext(ThemeContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return(
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.flatListMenu}>
      <ImageButton buttonTitle='List Transaction' imageName='list' onPress={() => navigation.navigate('Transactions')} />
      <ImageButton buttonTitle='Balance History' imageName='history' onPress={() => navigation.navigate('BalanceHistory')} />
      <ImageButton buttonTitle='Add Transaction' imageName='post-add' onPress={() => navigation.navigate('CreateTransaction', {})} />
      <ImageButton buttonTitle='Add Category' imageName='category' onPress={() => navigation.navigate('CreateCategory', {})} />
      <ImageButton buttonTitle='Renew Balance' imageName='autorenew'onPress={onRenewButtonPress} />
      <ImageButton buttonTitle='Filter Transaction' imageName='filter-list' onPress={() => navigation.navigate('FilterTransaction')} />
      <ImageButton buttonTitle='Export Balances' imageName='upload' onPress={onExportButtonPress} />
      <ImageButton buttonTitle='Import Balances' imageName='download' onPress={onImportButtonPress} />
      <ImageButton buttonTitle='Switch theme' imageName='dark-mode' lastItem onPress={() => {
        setScheme((previous) => { 
          if(colorMode === previous) toggleColorMode();
          return previous === 'dark' ? 'light' : 'dark' 
        });
      }} />
    </ScrollView>
  )
}

export default MainMenu;