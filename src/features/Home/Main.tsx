import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {Box, Text, Button, HStack, VStack} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Main = () => {
  const [dato, setDato] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {goBack, navigate} = useNavigation<StackNavigationProp<any>>();
  const onBorrar = async () => {
    try {
      await Keychain.resetGenericPassword();
      goBack();
    } catch (err) {
      console.log('Could not reset credentials, ' + err);
    }
  };
  const onVerDato = async () => {
    try {
      const options = {
        authenticationPrompt: {
          title: 'Authentication needed',
          subtitle: 'Subtitle',
          description: 'Some descriptive text',
          cancel: 'Cancel',
        },
      };
      const credentials = await Keychain.getGenericPassword(options);
      if (credentials) {
        setDato('Este es el dato seguro');
        setError(null);
      } else {
        setError('No credentials stored.');
      }
    } catch (err) {
      setError('Could not load credentials. ' + err);
    }
  };
  const onOcultar = () => setDato(null);
  useEffect(() => {
    AppState.addEventListener('change', (nextAppState: string) => {
      if (nextAppState === 'background') {
        navigate('Block');
      }
    });
  });
  return (
    <Box safeArea>
      <VStack m="auto" width={350} space={3}>
        <Text fontSize="xl" bold>
          Main
        </Text>
        <Button onPress={onVerDato}>Ver dato seguro</Button>
        {dato && (
          <HStack justifyContent="center">
            <Text m="auto" p="2" bg="yellow.500">
              {dato}
            </Text>
            <Button onPress={onOcultar}>Ocultar</Button>
          </HStack>
        )}
        {error && (
          <Text fontSize="xl" bold color="red.500">
            {error}
          </Text>
        )}
        <Button onPress={onBorrar}>Borrar</Button>
      </VStack>
    </Box>
  );
};

export {Main};
