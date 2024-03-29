import React from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './app/routes';
import { RealmContext } from './app/configs/RealmContext';
import { DEFAULT_BLACK, DEFAULT_BUTTON_COLOR } from './app/resources/values/colors';
import AppConfigContextProvider from './app/context/appConfig.context';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs(true);

const App: React.FC = () => {
  const { RealmProvider } = RealmContext;
  return (
    <NavigationContainer>
      <RealmProvider>
        <NativeBaseProvider>
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
      </RealmProvider>
    </NavigationContainer>
  );
}

export default App;
