import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export const useStyle = () => { 
  const { colors } = useTheme();

  return StyleSheet.create({
    componentView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20, 
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    balanceTitle: {
      fontSize: 15,
      color: colors.text
    },
    balanceText: {
      fontSize: 25,
      fontWeight: "500"
    },
    textStyle: {
      marginTop: 5,
      fontSize: 12,
      color: colors.text
    },
    boldTextStyle: {
      fontWeight: "700", 
      fontSize: 14,
      color: colors.text
    }
  })
};