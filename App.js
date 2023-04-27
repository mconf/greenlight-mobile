import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AuthContextProvider } from './src/store/context/auth-context';

// Screens
import LoginScreen from './src/screens/LoginScreen';

// Resources
import Colors from './src/constants/colors';
import './src/utils/i18n';

const Stack = createNativeStackNavigator();

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <NavigationContainer linking={linking}>
        <AuthContextProvider>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: Colors.blue },
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

          </Stack.Navigator>
        </AuthContextProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
