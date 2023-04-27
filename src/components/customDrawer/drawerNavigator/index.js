import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import { Octicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import HomeScreen from '../../../screens/HomeScreen';

import Colors from '../../../constants/colors';
import Styled from '../styles';

// components
import CustomDrawer from '../index';

const DrawerNavigator = ({ onLeaveSession }) => {
  const { t } = useTranslation();
  const Drawer = createDrawerNavigator();

  const HomeIconView = () => {
    return (
      <Styled.DrawerIcon>
        <Octicons name="home" size={24} color="black" />
      </Styled.DrawerIcon>
    );
  };

  return (
    <Drawer.Navigator
      independent
      drawerContent={(props) => <CustomDrawer {...props} onLeaveSession={onLeaveSession} />}
      screenOptions={{
        contentOptions: {
          style: {
            backgroundColor: 'black',
            flex: 1,
          },
        },
        drawerStyle: {
          width: '80%',
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
        drawerLabelStyle: {
          textAlign: 'left',
          textAlignVertical: 'center',
          paddingLeft: 1,
          fontSize: 14,
          fontWeight: '400',
          lineHeight: 18,
        },
        sceneContainerStyle: { backgroundColor: '#06172A' },
        drawerActiveBackgroundColor: Colors.lightGray100,
        drawerInactiveBackgroundColor: Colors.lightGray100,
        drawerActiveTintColor: Colors.lightGray400,
        drawerInactiveTintColor: Colors.lightGray400,
        headerStyle: { backgroundColor: Colors.blue },
        headerTitleContainerStyle: { maxWidth: '75%' },
        headerTintColor: Colors.white,
        drawerBackgroundColor: Colors.blue,
        headerTitleAlign: 'center',
        headerTitle: 'Greenlight'
      }}
    >
      <Drawer.Screen
        name="Main"
        component={HomeScreen}
        options={{
          title: t('components.drawer.home'),
          drawerIcon: () => (
            <HomeIconView />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
