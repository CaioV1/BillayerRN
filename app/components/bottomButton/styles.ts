import { StyleSheet } from "react-native";
import { DEFAULT_BUTTON_COLOR } from "../../resources/values/colors";

export const styles = StyleSheet.create({
  touchable: { 
    flex: 1, 
    justifyContent: 'flex-end'
  },
  viewContainer: {
    width: '100%',
    height: 80,
    backgroundColor: DEFAULT_BUTTON_COLOR,
    alignItems: 'center'
  },
  text: {
    marginTop: 20,
    fontSize: 20
  }
});