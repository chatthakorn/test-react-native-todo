import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
import $axios from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Todoed() {
  let [done, setDone] = useState([]);

  useEffect(() => {
    const fetchDone = async () => {
      const token = await AsyncStorage.getItem('access_token');
      const {data} = await $axios.get('/profile/todoed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDone(data.todoes);
    };
    fetchDone();
  }, [done]);

  const removeDone = async (id, j) => {
    const token = await AsyncStorage.getItem('access_token');
    await $axios.delete(`/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    done.splice(j, 1);
  };

  return (
    <View style={styles.inputStyle}>
      <Card containerStyle={{width: '90%'}}>
        <Card.Title>Todoed</Card.Title>
        <Card.Divider />
        {done.map((i, j) => (
          <ListItem key={j}>
            <ListItem.Content>
              <ListItem.Title>{i.text}</ListItem.Title>
            </ListItem.Content>
            <Button
              title="ลบ"
              type="clear"
              onPress={() => removeDone(i._id, j)}
            />
          </ListItem>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
  },
});
