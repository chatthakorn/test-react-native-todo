import React, {useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import $axios from '../utils/http';

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerNow = async () => {
    if (password.length > 3) {
      await $axios.post('/users/createUser', {
        email,
        password,
      });
      navigation.navigate('Login');
    } else {
      Alert.alert(1);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>สมัครสมาชิก</Card.Title>
        <Card.Divider />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="สมัครสมาชิก"
          onPress={() => registerNow()}
          disabled={!password}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
