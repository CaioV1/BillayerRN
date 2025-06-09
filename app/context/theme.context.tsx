import React, { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Theme } from "@react-navigation/native";

import Config from "../models/schemas/ConfigSchema";
import ContextProviderProps from "../models/interfaces/ContextProviderProps";

import { RealmContext } from "../configs/RealmContext";
import { darkTheme, lightTheme } from "../resources/values/colors";

export type SchemeColor = 'dark'|'light';

const { useRealm, useQuery } = RealmContext;

export const ThemeContext = createContext({
  theme: lightTheme,
  scheme: 'light',
  setScheme: (_theme: SchemeColor) => {}
})

export const ThemeContextProvider: React.FC<ContextProviderProps> = ({children}) => {
  const realm = useRealm();
  const response = useQuery(Config);

  const [ scheme, setScheme ] = useState<SchemeColor>(() => response.length > 0 && response[0].darkTheme ? 'dark' : 'light');
  const [ theme, setTheme ] = useState<Theme>(() => response.length > 0 && response[0].darkTheme ? darkTheme : lightTheme);

  useEffect(() => {
    const listener = Appearance.addChangeListener((preferences) => {
      setScheme(preferences.colorScheme || 'light')
    })

    return () => listener.remove();
  }, [])

  useEffect(() => {
    if(response.length > 0) realm.write(() => { realm.create('Config', { ...response[0], darkTheme: scheme === 'dark' }, true) })
    setTheme(scheme === 'dark' ? darkTheme : lightTheme)
  }, [scheme])

  return (
    <ThemeContext.Provider value={{ theme, scheme, setScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}