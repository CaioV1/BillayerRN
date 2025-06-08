import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    viewContainer: { 
      flex: 1,
      paddingTop: 30
    },
    screenTopText: {
      fontSize: 25,
      marginHorizontal: 20,
      color: colors.text
    }
  })
};