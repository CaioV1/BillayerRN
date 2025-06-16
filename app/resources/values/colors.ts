import { Theme } from "@react-navigation/native";
import { extendTheme } from 'native-base';

export const fieldsTheme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        color: 'white',
        placeholderTextColor: 'gray.400',
        borderBottomColor: 'gray.300',
      }
    },
    Select: {
      defaultProps: {
        placeholderTextColor: 'gray.400',
        borderBottomColor: 'gray.300',
      },
    },
    TextArea: {
      defaultProps: {
        placeholderTextColor: 'gray.400',
        borderBottomColor: 'gray.300',
      },
    },
  },
});

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#CCCCCC',
    background: '#FFFFFF',
    border: '#000000',
    card: '#e3ba62',
    notification: '#FFFFFF',
    text: '#000000'
  }
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#6e6e6e',
    background: '#1f1f1e',
    border: '#FFFFFF',
    card: '#4d4c4c',
    notification: '#000000',
    text: '#FFFFFF'
  }
}

export const DEFAULT_BUTTON_COLOR = '#e3ba62';
export const DEFAULT_BLACK = '#000000';
export const DEFAULT_RED = '#fc5656';
export const DEFAULT_GRAY = '#CCCCCC';
export const LIGHT_GRAY = '#dedcdc';