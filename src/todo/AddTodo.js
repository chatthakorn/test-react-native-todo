import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Overlay, Button, Input} from 'react-native-elements';
import $axios from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTodo({isOverlay, visible}) {
  let [todo, setTodo] = useState('');
  let [userID, setUserID] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const token = await AsyncStorage.getItem('access_token');
      const {data} = await $axios.get('/profile/todoed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(data.user._id);
    };
    getUserId();
  });

  const createToto = async (id) => {
    const token = await AsyncStorage.getItem('access_token');
    const create_by = userID;
    await $axios.post(
      '/profile',
      {create_by, text: todo},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    isOverlay();
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={isOverlay}
        overlayStyle={styles.container}>
        <Text h2>สร้าง Todo</Text>
        <Input
          placeholder="สร้าง Todo"
          onChangeText={(text) => setTodo(text)}
        />
        <Button
          title="สร้าง Todo"
          onPress={() => createToto()}
          disabled={!todo}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
  },
});
