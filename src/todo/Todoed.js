import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
import axios from 'axios';

export default function Todoed() {
  let [done, setDone] = useState([]);

  useEffect(() => {
    const fetchDone = async () => {
      const {data} = await axios.get('http://10.0.2.2:8888/todos/done');
      setDone(data);
    };
    fetchDone();
  }, [done]);

  const removeDone = async (id, j) => {
    await axios.delete(`http://10.0.2.2:8888/todos/${id}`);
    done.splice(j, 1);
  };

  return (
    <View style={styles.inputStyle}>
      <Card containerStyle={{width: '90%'}}>
        <Card.Title>Todoed</Card.Title>
        <Card.Divider />
        {done.map((i, j) => (
          <ListItem key={j} title={i.text}>
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
