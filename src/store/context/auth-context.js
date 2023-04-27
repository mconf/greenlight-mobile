import {
  createContext, useCallback, useEffect, useMemo, useState
} from 'react';
import * as SecureStore from 'expo-secure-store';

let logoutTimer;

export const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  user: {},
  login: () => { },
  logout: () => { },
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

const retrieveStoredToken = async () => {
  let token = null;
  try {
    token = await SecureStore.getItemAsync('token');
  } catch (e) {
    // this only throws if they reinstall the app
    console.error('error retrieveStoredToken', e);
    await SecureStore.deleteItemAsync('token');
  }
  return { token };
};

const retrieveStoredUser = async () => {
  let user = null;
  try {
    user = await SecureStore.getItemAsync('user');
  } catch (e) {
    // this only throws if they reinstall the app
    console.error('error retrieveStoredUser', e);
    await SecureStore.deleteItemAsync('user');
  }
  return JSON.parse(user);
};

export const AuthContextProvider = (props) => {
  const { children } = props;

  let initialUser;
  let initialToken;

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const userIsLoggedIn = !!token;

  const retrieveToken = async () => {
    const tokenData = await retrieveStoredToken();
    if (tokenData?.token) {
      setToken(tokenData.token);
      const storedUser = await retrieveStoredUser();
      setUser(storedUser);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  const logoutHandler = useCallback(async () => {
    setToken(null);
    setUser({});
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
  }, []);

  const loginHandler = async (newToken, newUser, expirationTime) => {
    setToken(newToken);
    setUser(newUser);
    // TODO set user/token/expirationTime in memory
    await SecureStore.setItemAsync('token', newToken);
    await SecureStore.setItemAsync('user', JSON.stringify(newUser));

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = useMemo(() => {
    return {
      token,
      user,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };
  }, [token, user, userIsLoggedIn, loginHandler, logoutHandler]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
