import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthContext} from '../utils/authContext';

export default function Profile() {
  const {signOut} = useContext(AuthContext);
  return (
    <View>
      <Text>1</Text>
      <Button title="ออกจากระบบ" onPress={() => signOut()} />
    </View>
  );
}
