import React, {useEffect} from 'react';
import {Box, VStack, Text, Input, Button, FormControl} from 'native-base';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Keychain from 'react-native-keychain';

interface IFormLogin {
  username: string;
  password: string;
}

const SignIn = () => {
  const {navigate} = useNavigation<StackNavigationProp<any>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormLogin>();
  const onSubmit: SubmitHandler<IFormLogin> = async data => {
    const {username, password} = data;
    await Keychain.setGenericPassword(username, password, {
      accessControl:
        Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      authenticationType:
        Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    });
    navigate('AppStack');
  };
  useEffect(() => {
    Keychain.getSupportedBiometryType({}).then(biometryType => {
      console.log({biometryType});
    });
    Keychain.canImplyAuthentication({}).then(canImplyAuthentication => {
      console.log({canImplyAuthentication});
    });
  }, []);
  return (
    <Box safeArea flex={1}>
      <VStack m="auto" width="85%" space={3}>
        <Text fontSize="xl" bold variant="bold">
          Iniciar sesión
        </Text>

        <FormControl isRequired isInvalid={'username`' in errors}>
          <FormControl.Label>Usuario</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onBlur, onChange, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="Usuario"
                borderColor="gray.500"
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="username"
            rules={{required: 'Field is required', minLength: 3}}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.username?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={'password`' in errors}>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onBlur, onChange, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="Contraseña"
                borderColor="gray.500"
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="password"
            rules={{required: 'Field is required', minLength: 3}}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)}>Iniciar</Button>
      </VStack>
    </Box>
  );
};

export {SignIn};
