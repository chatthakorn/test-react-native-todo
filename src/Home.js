import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import Login from './Login/Login';
import Register from './Login/Register';

export default function Root({navigate}) {
  const [index, setIndex] = useState(0);

  const selectIndex = (i) => setIndex(i);
  const register = (i) => setIndex(i);

  const buttons = ['Login', 'Register'];

  useEffect(() => console.log(navigate));

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={selectIndex}
        buttons={buttons}
        selectedIndex={index}
        containerStyle={styles.buttomGroupHeight}
      />
      {index === 0 ? (
        <Login navigation={navigate} />
      ) : (
        <Register register={register} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttomGroupHeight: {
    height: 35,
  },
});
