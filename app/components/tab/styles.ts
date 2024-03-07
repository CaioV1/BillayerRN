import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    borderBottomWidth: 1
  },
  tabText: {
    fontSize: 15, 
    textAlign: 'center'
  },
  selectedTabText: {
    fontSize: 15, 
    textAlign: 'center',
    fontWeight: '700'
  },
});