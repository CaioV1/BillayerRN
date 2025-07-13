import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const useStyle = () => {
  const { colors } = useTheme();
  
  return StyleSheet.create({
    componentView: { 
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "center"
    },
    imageView: { 
      margin: 15,
      padding: 15,
      borderWidth: 1, 
      borderRadius: 15,
      backgroundColor: colors.card
    },
    image: {
      height: 35,
      width: 35,
      marginVertical: 30,
      marginHorizontal: 60
    },
    textStyle: {
      marginTop: 15,
      marginBottom: 5,
      fontSize: 25,
      textAlign: "left"
    }
  });
}