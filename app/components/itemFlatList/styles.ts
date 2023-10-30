import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  iconView: {
    width: '15%',
    paddingLeft: 10,
  },
  iconImage: {
    height: 40,
    width: 40
  },
  titleDateView: {
    width: '60%',
  },
  valueView: {
    width: '25%',
    paddingRight: 10,
  },
  titleText: {
    fontSize: 16
  },
  datetimeText: {
    fontSize: 10
  },
  valueText: {
    fontSize: 16,
    textAlign: 'right',
  }
});

export default styles;