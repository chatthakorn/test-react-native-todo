import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Overlay, Button, Input} from 'react-native-elements';
import axios from 'axios';

export default function AddTodo({isOverlay, visible}) {
  let [todo, setTodo] = useState('');

  const createToto = async () => {
    await axios.post('http://10.0.2.2:8888/todos/', {text: todo});
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
          placeholder="กินข้างเช้า!"
          onChangeText={(text) => setTodo(text)}
        />
        <Button title="สร้าง Todo" onPress={createToto} disabled={!todo} />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
  },
});
