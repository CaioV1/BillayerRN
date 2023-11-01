import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './app/routes';
import { RealContext } from './app/configs/RealmContext';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const { RealmProvider } = RealContext;
  return (
    <NavigationContainer>
      <RealmProvider>
        <NativeBaseProvider>
          <Stack.Navigator>
            {routes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name} 
                component={route.component}
                options={{
                  title: route.title
                }}
              />
            ))}
          </Stack.Navigator>
        </NativeBaseProvider>
      </RealmProvider>
    </NavigationContainer>
  );
}

export default App;
