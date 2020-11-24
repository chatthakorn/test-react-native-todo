import React from 'react';
import Login from './Login/Login';
import Register from './Login/Register';
import Profile from './Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function SignIn() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerLeft: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
