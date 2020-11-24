import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const $axios = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

export default $axios;
