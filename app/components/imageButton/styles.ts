import { StyleSheet } from "react-native";
import { DEFAULT_BUTTON_COLOR } from "../../resources/values/colors";

export const styles = StyleSheet.create({
  componentView: { 
    marginLeft: 20
  },
  imageView: {
    height: 70,
    width: 70,
    backgroundColor: DEFAULT_BUTTON_COLOR,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  textView: {
    width: 70
  },
  textStyle: {
    marginTop: 5,
    // marginBottom: 5,
    fontSize: 12,
    textAlign: "center"
  }
});