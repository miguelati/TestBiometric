import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn, SignOut} from '~/features/Auth';

type AuthStackParamList = {
  SignIn: undefined;
  SignOut: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen name="SignOut" component={SignOut} />
    </Stack.Navigator>
  );
};

export {AuthStack};
