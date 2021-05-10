import axios from 'axios';

export const getVerifyCredential = (apiKey, secretKey) => {
  return axios.get('http://localhost:3000/verify', {
    params: {
      apiKey: apiKey,
      secretKey: secretKey
    }
  });
};
