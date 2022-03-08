import React, {useState} from 'react';
import {Box, VStack, Text, Button} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Block = () => {
  const [error, setError] = useState<string | null>(null);
  const {goBack} = useNavigation<StackNavigationProp<any>>();
  const onIngresarNuevamente = async () => {
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
        goBack();
      } else {
        setError('No credentials stored.');
      }
    } catch (err) {
      setError('Could not load credentials. ' + err);
    }
  };
  return (
    <Box safeArea>
      <VStack m="auto" width={350} space={3}>
        <Text fontSize="2xl" bold>
          Block
        </Text>
        <Button onPress={onIngresarNuevamente}>Ingresar nuevamente</Button>
        {error && (
          <Text fontSize="xl" bold color="red.500">
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export {Block};
