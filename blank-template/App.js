import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { ThemeProvider } from './context/ThemeContext';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar hidden/>
      <ThemeProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
