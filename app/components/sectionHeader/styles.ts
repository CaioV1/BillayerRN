import { StyleSheet } from "react-native";
import { LIGHT_GRAY } from "../../resources/values/colors";

export const styles = StyleSheet.create({
  viewContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: LIGHT_GRAY,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginVertical: 20,
    fontSize: 15,
    fontWeight: "700"
  }
});