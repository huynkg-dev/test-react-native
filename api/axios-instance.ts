import axios from 'axios';

const URL = `${process.env.EXPO_PUBLIC_API_URL}/3/`;
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
};

const AXIOS = axios.create({ baseURL: URL, headers: HEADERS });

AXIOS.interceptors.request.use((config) => {
  return config;
});

AXIOS.interceptors.response.use(function (response) {
  return response.data;
}, async function (error) {
  return Promise.reject(error);
});

export default AXIOS;