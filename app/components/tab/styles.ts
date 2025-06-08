import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    viewContainer: { 
      display: 'flex', 
      flexDirection: "row", 
      alignItems: "center"
    },
    tabView: {
      paddingVertical: 20
    },
    selectedTabView: {
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border
    },
    tabText: {
      fontSize: 15, 
      textAlign: 'center',
      color: colors.text
    },
    selectedTabText: {
      fontSize: 15, 
      textAlign: 'center',
      fontWeight: '700',
      color: colors.text
    },
  })
};