import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(async (config) => {
  const url = Constants.expoConfig.extra.apiUrl;
  if (url) {
    config.baseURL = url;
  }
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers = { Authorization: token };
  }

  return config;
});

export default api;

