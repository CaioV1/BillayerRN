import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  componentView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20, 
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  balanceTitle: {
    fontSize: 15,
  },
  balanceText: {
    fontSize: 25,
    fontWeight: "500"
  },
  textStyle: {
    marginTop: 5,
    fontSize: 12,
  },
  boldTextStyle: {
    fontWeight: "700", 
    fontSize: 14
  }
});