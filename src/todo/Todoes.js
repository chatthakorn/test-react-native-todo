import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import $axios from '../utils/http';

export default function Todoes() {
  const [todoes, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = await AsyncStorage.getItem('access_token');
      let {data} = await $axios.get('/profile/todoes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(data.todoes);
    };
    fetchTodos();
  }, [todoes]);

  const deleteTodo = async (id, j) => {
    const token = await AsyncStorage.getItem('access_token');
    await $axios.delete(`/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    todoes.splice(j, 1);
  };

  const done = async (id, j) => {
    const token = await AsyncStorage.getItem('access_token');
    await $axios.patch(
      `/profile/${id}`,
      {
        status: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    todoes.splice(j, 1);
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={{width: '90%'}}>
        <Card.Title>Todos</Card.Title>
        <Card.Divider />
        {todoes.map((i, j) => (
          <ListItem key={j}>
            <ListItem.Content>
              <ListItem.Title>{i.text}</ListItem.Title>
            </ListItem.Content>
            <Button title="เสร็จ" onPress={() => done(i._id, j)} />
            <Button
              title="ลบ"
              type="clear"
              onPress={() => deleteTodo(i._id, j)}
            />
          </ListItem>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
