import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { AuthContextProvider } from './src/store/context/auth-context';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import EmailLoginScreen from './src/screens/LoginScreen/EmailLoginScreen';

// Resources
import Colors from './src/constants/colors';
import './src/utils/i18n';

const Stack = createStackNavigator();
const prefix = Linking.createURL('portal');

const App = () => {
  const { t } = useTranslation();

  const config = {
    screens: {
      UpdateAppScreen: {
        path: 'join/:roomSlug',
        parse: {
          roomSlug: (roomSlug) => `${roomSlug}`
        }
      },
    },
  };

  const linking = {
    prefixes: [prefix],
    config
  };

  return (
    <>
      <NavigationContainer linking={linking}>
        <AuthContextProvider>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            contentStyle: { backgroundColor: Colors.white },
            headerTitleAlign: 'center',
          }}
          >
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EmailLoginScreen"
              component={EmailLoginScreen}
              options={{
                title: 'Login Email',
              }}
            />

          </Stack.Navigator>
        </AuthContextProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
