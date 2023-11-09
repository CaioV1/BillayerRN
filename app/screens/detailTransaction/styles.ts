import { StyleSheet } from "react-native";
import { DEFAULT_GRAY } from "../../resources/values/colors";

export const styles = StyleSheet.create({
  viewContainer: { 
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'space-evenly',
  },
  viewHeaderTexts: { 
    alignItems: "center",
    justifyContent: 'center',
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
    backgroundColor: DEFAULT_GRAY,
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
    fontWeight: '700'
  },
  transactionValueText: {
    marginTop: 5,
    fontSize: 15,
  },
});