import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements';
import axios from 'axios';

export default () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let {data} = await axios.get('http://10.0.2.2:8888/todos');
      setTodos(data);
    };
    fetchTodos();
  }, [todos]);

  const deleteTodo = async (id, j) => {
    await axios.delete(`http://10.0.2.2:8888/todos/${id}`);
    todos.splice(j, 1);
  };

  const done = async (id, j) => {
    await axios.patch(`http://10.0.2.2:8888/todos/${id}`, {status: true});
    todos.splice(j, 1);
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={{width: '90%'}}>
        <Card.Title>Todos</Card.Title>
        <Card.Divider />
        {todos.map((i, j) => (
          <ListItem key={j} title={i.text}>
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
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
