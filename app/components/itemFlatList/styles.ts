import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  titleView: {
    width: '55%',
    marginVertical: 10,
  },
  valueView: {
    width: '30%',
    paddingRight: 10,
  },
  titleText: {
    fontSize: 16
  },
  subtitleText: {
    fontSize: 10
  },
  valueText: {
    fontSize: 16,
    textAlign: 'right',
  }
});

export default styles;