import fs from 'fs';
import { getVerifyCredential } from './api';

export const getSaveCredential = (apiKey, secretKey) => {
  return new Promise((resolve, reject) => {
    const credential = {
      "apiKey": apiKey,
      "secretKey": secretKey
    };
    const data = JSON.stringify(credential);
    fs.writeFile('credential.json', data, (err) => {
      if (err){
        reject(err);
        return;
      }
      resolve(true);
    })
  })

};


export const getCredential = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('credential.json', function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      try {
        const credential = JSON.parse(data);
        console.log(credential);
        resolve(credential);
      }catch(ex){
        reject(ex);
      }
    });
  });
};

export const checkCredential = async () => {
  const credential = await getCredential();
  if (credential.apiKey && credential.secretKey){
    const checkResult = await getVerifyCredential(credential.apiKey, credential.secretKey);
    return checkResult.data !== false;
  }
  return false;
};


export const getCurrent = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
};
