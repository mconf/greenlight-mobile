/* eslint-disable react/jsx-indent */
import {
  useContext, useCallback, useState, useEffect
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  BackHandler
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import Styled from './styles';
import Button from '../../components/Button';
import { AuthContext } from '../../store/context/auth-context';
import api from '../../services/api';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props) => {
  const { navigation, route } = props;
  const authCtx = useContext(AuthContext);

  const { t } = useTranslation();

  const [didLoad, setDidLoad] = useState(false);

  /* useEffects */

  // Back button handler
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  // Authenticate user if token exists
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!didLoad && authCtx?.token) {
      api.get('/api/v1/users/authenticate')
        .then((response) => {
          const { token } = authCtx;
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
              } }) .catch((err) => {
              console.log(`error ${err}`);
            });
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
      setDidLoad(true);
    }
  }, [didLoad, authCtx]);

  const LoginPage = () => {
    return (
      <>
        <>
          <Styled.AlternateLogin>
            <Styled.LoadingText>{t('screens.login.login')}</Styled.LoadingText>
          </Styled.AlternateLogin>

          <Button
            variant="secondary"
            onPress={() => navigation.navigate('EmailLoginScreen', { roomSlug: route.params?.roomSlug })}
          >
            Email
          </Button>

        </>
        <StatusBar style="dark" />
      </>
    );
  };

  return (
    <Styled.Container>
      {LoginPage()}
    </Styled.Container>
  );
};

export default LoginScreen;
