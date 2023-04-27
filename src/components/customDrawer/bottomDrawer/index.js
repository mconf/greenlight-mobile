/* eslint-disable react/destructuring-assignment */
import { useContext } from 'react';
import { nativeApplicationVersion } from 'expo-application';
import { useNavigation } from '@react-navigation/native';
import {
  DrawerItem
} from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../store/context/auth-context';
import api from '../../../services/api';
import Styled from '../styles';
import Colors from '../../../constants/colors';

const BottomDrawer = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const logout = () => {
    api.delete('api/v1/users/logout')
      .then(() => {
        authCtx.logout();
        navigation.navigate('LoginScreen');
      })
      .catch((err) => {
        authCtx.logout();
        navigation.navigate('LoginScreen');
        console.log(err);
      });
  };

  const LogoutIconView = () => {
    return (
      <Styled.DrawerIcon>
        <MaterialIcons name="logout" size={24} color="black" />
      </Styled.DrawerIcon>
    );
  };

  return (
    <>
      <DrawerItem
        label="Logout"
        labelStyle={{ fontWeight: '400' }}
        onPress={() => logout()}
        inactiveTintColor={Colors.lightGray400}
        inactiveBackgroundColor={Colors.lightGray100}
        icon={() => <LogoutIconView />}
      />
      <Styled.AppVersion>
        {t('components.drawer.version')}
        {' '}
        {nativeApplicationVersion}
      </Styled.AppVersion>
    </>
  );
};

export default BottomDrawer;
