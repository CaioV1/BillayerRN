import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { useColorMode } from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { styles } from "./styles";
import { ThemeContext } from "../../../../context/theme.context";
import { listMenu } from "../../../../resources/static/menuBalance";

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
      <ImageButton buttonTitle='List Transaction' imageBase64={listMenu[0].data} onPress={() => navigation.navigate('Transactions')} />
      <ImageButton buttonTitle='Balance History' imageBase64={listMenu[3].data} onPress={() => navigation.navigate('BalanceHistory')} />
      <ImageButton buttonTitle='Add Transaction' imageBase64={listMenu[2].data} onPress={() => navigation.navigate('CreateTransaction', {})} />
      <ImageButton buttonTitle='Add Category' imageBase64={listMenu[1].data} onPress={() => navigation.navigate('CreateCategory', {})} />
      <ImageButton buttonTitle='Renew Balance' imageBase64={listMenu[4].data} onPress={onRenewButtonPress} />
      <ImageButton buttonTitle='Filter Transaction' imageBase64={listMenu[10].data} onPress={() => navigation.navigate('FilterTransaction')} />
      <ImageButton buttonTitle='Export Balances' imageBase64={listMenu[7].data} onPress={onExportButtonPress} />
      <ImageButton buttonTitle='Import Balances' imageBase64={listMenu[8].data} onPress={onImportButtonPress} />
      <ImageButton buttonTitle='Switch theme' lastItem imageBase64={listMenu[11].data} onPress={() => {
        setScheme((previous) => { 
          if(colorMode === previous) toggleColorMode();
          return previous === 'dark' ? 'light' : 'dark' 
        });
      }} />
    </ScrollView>
  )
}

export default MainMenu;