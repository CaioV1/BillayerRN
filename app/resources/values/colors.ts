import { Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#FFFFFF',
    background: '#FFFFFF',
    border: '#FFFFFF',
    card: '#FFFFFF',
    notification: '#FFFFFF',
    text: '#000000'
  }
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#000000',
    background: '#403f3f',
    border: '#000000',
    card: '#000000',
    notification: '#000000',
    text: '#FFFFFF'
  }
}

export const DEFAULT_BUTTON_COLOR = '#e3ba62';
export const DEFAULT_BLACK = '#000000';
export const DEFAULT_RED = '#ba2731';
export const DEFAULT_GRAY = '#CCCCCC';
export const LIGHT_GRAY = '#dedcdc';