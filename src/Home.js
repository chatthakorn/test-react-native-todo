import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonGroup, Button} from 'react-native-elements';
import Todos from './todo/Todos';
import Todoed from './todo/Todoed';
import AddTodo from './todo/AddTodo';

export default function Home() {
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [visible, setVisible] = useState(false);

  const updatedIndex = (s) => {
    setSelectedIndex(s);
  };

  const overLay = () => {
    setVisible(!visible);
  };

  const buttons = ['Todo', 'Todoed'];

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={updatedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 35}}
      />
      {selectedIndex === 0 ? <Todos /> : <Todoed />}
      <Button onPress={overLay} title="+" containerStyle={styles.fixb} />
      <AddTodo visible={visible} isOverlay={overLay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixb: {
    position: 'absolute',
    right: 15,
    bottom: 80,
  },
});
