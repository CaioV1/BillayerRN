import { StyleSheet } from "react-native";
import { DEFAULT_GRAY } from "../../resources/values/colors";
import { useTheme } from "@react-navigation/native";

export const useStyle = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    viewContainer: { 
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: 'space-evenly',
    },
    viewHeaderTexts: { 
      alignItems: "center",
      justifyContent: 'center',
      color: colors.text
    },
    viewImageButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingRight: 20,
      marginBottom: 20,
    },
    viewIcon: {
      borderRadius: 30,
      marginBottom: 30,
      padding: 20,
      backgroundColor: colors.card,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconImage: {
      height: 30,
      width: 30,
      margin: 20
    },
    transactionNameText: {
      fontSize: 25,
      fontWeight: '700',
      color: colors.text
    },
    transactionValueText: {
      marginTop: 5,
      fontSize: 15,
      color: colors.text
    },
  });
}