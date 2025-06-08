import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    viewContainer: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: colors.background
    },
    text: {
      marginVertical: 20,
      fontSize: 15,
      fontWeight: "700",
      color: colors.text
    }
  })
};