import React, {useReducer, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './utils/authContext';
import axios from 'axios';
import Home from './Home';
import Profile from './Profile/Profile';

const Stack = createStackNavigator();

export default function Root({navigation}) {
  const [state, dispatch] = useReducer(
    async (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: await AsyncStorage.removeItem('userToken'),
          };
      }
    },
    {
      isSignout: false,
      userToken: AsyncStorage.removeItem('userToken'),
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {}
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      async signIn(data) {
        let res = await axios.post('http://10.0.2.2:3000/auth/login', {
          email: data.email,
          password: data.password,
        });
        await AsyncStorage.setItem('access_token', res.access_token);
        dispatch({type: 'SIGN_IN', token: 'access_token'});
      },
      signOut() {
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!state.userToken ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="Profile" component={Profile} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
