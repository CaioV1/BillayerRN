import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './app/routes';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((route) => (
          <Stack.Screen 
            name={route.name} 
            component={route.component}
            options={{
              title: route.title
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
