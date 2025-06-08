import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    viewContainer: { 
      flex: 1,
      paddingTop: 30
    },
    viewHeaderTexts: { 
      alignItems: "center",
      justifyContent: 'center',
      paddingTop: 30,
      marginBottom: 30,
      color: colors.text
    },
    viewImageButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingRight: 20,
      marginBottom: 20,
    },
    categoryNameText: {
      fontSize: 25,
      fontWeight: '700',
      color: colors.text
    },
    categoryBudgetText: {
      marginTop: 5,
      fontSize: 15,
      color: colors.text
    },
  });
}