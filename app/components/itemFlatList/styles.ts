import { StyleSheet } from 'react-native';
import { DEFAULT_BLACK } from '../../resources/values/colors';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: DEFAULT_BLACK,
  },
  iconView: {
    width: '12%',
    borderRadius: 30,
    backgroundColor: DEFAULT_BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    height: 30,
    width: 30,
    margin: 5
  },
  titleView: {
    width: '58%',
    marginVertical: 10,
    paddingLeft: 10,
  },
  valueView: {
    width: '30%',
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