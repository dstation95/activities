import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignupPage';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
};

export default AppStack;