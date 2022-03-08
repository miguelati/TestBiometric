import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Main, Block} from '~/features/Home';

type AppStackParamList = {
  Main: undefined;
  Block: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Main"
        component={Main}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Block"
        component={Block}
      />
    </Stack.Navigator>
  );
};

export {AppStack};
