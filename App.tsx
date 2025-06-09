import React, { ReactNode, useContext } from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './app/routes';
import { RealmContext } from './app/configs/RealmContext';
import { DEFAULT_BLACK, DEFAULT_BUTTON_COLOR, fieldsTheme } from './app/resources/values/colors';
import AppConfigContextProvider from './app/context/appConfig.context';
import { ThemeContext, ThemeContextProvider } from './app/context/theme.context';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs(true);

const Navigation: React.FC<{children: ReactNode}> = ({ children }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <NavigationContainer theme={theme}>
      {children}
    </NavigationContainer>
  )
}

const App: React.FC = () => {
  const { RealmProvider } = RealmContext;

  return (
    <RealmProvider>
      <ThemeContextProvider>
        <Navigation>
          
            <NativeBaseProvider theme={fieldsTheme}>
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
            </NativeBaseProvider>
        </Navigation>
      </ThemeContextProvider>
    </RealmProvider>
  );
}

export default App;
