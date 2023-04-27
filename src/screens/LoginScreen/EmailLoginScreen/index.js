import { useState, useContext } from 'react';
import {
  Linking, TouchableWithoutFeedback
} from 'react-native';
import { TextInput as TIPaper } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import Styled from './styles';
import api from '../../../services/api';
import { AuthContext } from '../../../store/context/auth-context';

const LoginScreen = (props) => {
  const { navigation, route } = props;
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const [buttonLock, setButtonLock] = useState(false);
  const onChangeInputHandler = (inputIdentifier, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: value,
      };
    });
  };

  const signIn = () => {
    setButtonLock(true);
    api.post('/api/v1/users/login', {
      email: inputValues.email,
      password: inputValues.password
    }).then((response) => {
      const token = response.headers.authorization;
      const { data } = response.data;
      const user = {
        email: data.email, slug: data.slug, name: data.name, avatar: data.avatar
      };
      // eslint-disable-next-line react/destructuring-assignment
      authCtx.login(token, user, new Date().setFullYear(new Date().getFullYear() + 1))
        .then(() => {
          if (route.params?.roomSlug) {
            navigation.navigate('JoinConferenceScreen', { roomSlug: route.params?.roomSlug });
          } else {
            navigation.navigate('DrawerNavigator');
          }
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    })
      .catch((err) => {
        console.log(`error ${err}`);
        setLoginError(true);
        setButtonLock(false);
      });
  };

  const handleForgotPwdButton = () => {
    try {
      Linking.openURL('https://google.com');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <Styled.Container>
        <Styled.InputView>
          <TextInput
            label="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onError={loginError}
            value={inputValues.email}
            onChangeText={onChangeInputHandler.bind(this, 'email')}
          />
        </Styled.InputView>
        <Styled.InputView>
          <TextInput
            label={t('screens.login.password')}
            secureTextEntry={!showPassword}
            autoCorrect={false}
            onError={loginError}
            value={inputValues.password}
            onChangeText={onChangeInputHandler.bind(this, 'password')}
            right={(
              <TIPaper.Icon
                name={!showPassword ? 'eye' : 'eye-off'}
                onPress={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            )}
          />
        </Styled.InputView>

        <Styled.InfoContainer style={{ justifyContent: loginError ? 'space-between' : 'flex-end' }}>
          {loginError && <Styled.WrongCredentials>Email ou Senha errados</Styled.WrongCredentials>}
          <Styled.ForgotPassword onPress={handleForgotPwdButton}>
            {t('screens.login.forgotPassword')}
          </Styled.ForgotPassword>
        </Styled.InfoContainer>

        <Button
          variant="tertiary"
          onPress={signIn}
          disabled={buttonLock}
        >
          {t('screens.login.login')}
        </Button>
        <StatusBar style="light" />
      </Styled.Container>

    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
