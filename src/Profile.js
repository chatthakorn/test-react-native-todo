import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonGroup, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todoes from './todo/Todoes';
import Todoed from './todo/Todoed';
import AddTodo from './todo/AddTodo';

export default function Home({navigation}) {
  let [selectedIndex, setSelectedIndex] = useState(0);
  let [visible, setVisible] = useState(false);

  const updatedIndex = (s) => {
    setSelectedIndex(s);
  };

  const overLay = () => {
    setVisible(!visible);
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('access_token');
    navigation.navigate('Login');
  };

  const buttons = ['Todo', 'Todoed'];

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={updatedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.ButtonGroupHeight}
      />
      {selectedIndex === 0 ? <Todoes /> : <Todoed />}
      <Button title="ออกจากระบบ" type="clear" onPress={() => logOut()} />
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
  ButtonGroupHeight: {
    height: 35,
  },
});
