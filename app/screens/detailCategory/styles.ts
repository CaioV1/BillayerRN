import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewContainer: { 
    flex: 1,
    paddingTop: 30
  },
  viewHeaderTexts: { 
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: 30,
    marginBottom: 30
  },
  viewImageButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight: 20,
    marginBottom: 20,
  },
  categoryNameText: {
    fontSize: 25,
    fontWeight: '700'
  },
  categoryBudgetText: {
    marginTop: 5,
    fontSize: 15,
  },
});