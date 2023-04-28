import BbbSdk from 'bbb-mobile-sdk';
import { useContext } from 'react';
import { AuthContext } from '../../store/context/auth-context';

const InsideConferenceScreen = (props) => {
  const { route, navigation } = props;
  const authCtx = useContext(AuthContext);

  const onLeaveSession = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (authCtx.isLoggedIn) {
      navigation.navigate('DrawerNavigator');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <BbbSdk
      jUrl={route.params.jUrl}
      defaultLanguage={route.params.defaultLanguage}
      onLeaveSession={onLeaveSession}
    />
  );
};

export default InsideConferenceScreen;
