import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import $axios from '../utils/http';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logined = async () => {
    try {
      const {data} = await $axios.post('/auth/login', {email, password});
      await AsyncStorage.setItem('access_token', data.access_token);
      const t = await AsyncStorage.getItem('access_token');
      if (t) {
        navigation.navigate('Profile');
      }
    } catch (err) {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>เข้าสู่ระบบ</Card.Title>
        <Card.Divider />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="เข้าสู่ระบบ"
          onPress={() => logined()}
          disabled={!password}
        />
        <Button
          title="สมัครสมาชิก"
          type="clear"
          onPress={() => navigation.navigate('Register')}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
