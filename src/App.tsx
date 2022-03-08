/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {RouterStack} from '~Router';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RouterStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
