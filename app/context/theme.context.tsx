import React, { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Theme } from "@react-navigation/native";

import { darkTheme, lightTheme } from "../resources/values/colors";
import ContextProviderProps from "../models/interfaces/ContextProviderProps";

export type SchemeColor = 'dark'|'light';

export const ThemeContext = createContext({
  theme: lightTheme,
  scheme: 'light',
  setScheme: (_theme: SchemeColor) => {}
})

export const ThemeContextProvider: React.FC<ContextProviderProps> = ({children}) => {
  const [ scheme, setScheme ] = useState<SchemeColor>('light');
  const [ theme, setTheme ] = useState<Theme>(lightTheme);

  useEffect(() => {
    const listener = Appearance.addChangeListener((preferences) => {
      setScheme(preferences.colorScheme || 'light')
    })

    return () => listener.remove();
  }, [])

  useEffect(() => {
    setTheme(scheme === 'dark' ? darkTheme : lightTheme)
  }, [scheme])

  return (
    <ThemeContext.Provider value={{ theme, scheme, setScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}