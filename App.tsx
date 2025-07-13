import React, { ReactNode, useContext } from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RealmContext } from './app/configs/RealmContext';
import AppConfigContextProvider from './app/context/appConfig.context';
import { ThemeContext, ThemeContextProvider } from './app/context/theme.context';

import routes from './app/routes';
import { DEFAULT_BLACK, DEFAULT_BUTTON_COLOR, nativeBaseLightTheme, nativeBaseDarkTheme } from './app/resources/values/colors';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs(true);

const NavigationThemeContainer: React.FC<{children: ReactNode}> = ({ children }) => {
  const { theme, scheme } = useContext(ThemeContext)

  return (
    <NavigationContainer theme={theme}>
      <NativeBaseProvider theme={scheme === 'dark' ? nativeBaseDarkTheme : nativeBaseLightTheme}>
        {children}
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

const App: React.FC = () => {
  const { RealmProvider } = RealmContext;

  return (
    <RealmProvider>
      <ThemeContextProvider>
        <NavigationThemeContainer>
          <AppConfigContextProvider>
            <Stack.Navigator>
              {routes.map((route) => (
                <Stack.Screen
                  key={route.name}
                  name={route.name} 
                  component={route.component}
                  options={{
                    title: route.title,
                    headerBackTitleVisible: false,
                    headerTintColor: DEFAULT_BLACK,
                    headerStyle: {
                      backgroundColor: DEFAULT_BUTTON_COLOR
                    }
                  }}
                />
              ))}
            </Stack.Navigator>
          </AppConfigContextProvider>
        </NavigationThemeContainer>
      </ThemeContextProvider>
    </RealmProvider>
  );
}

export default App;
