import React, {useState} from 'react';
import styles from './index.css';
import Div from '../../components/Div';
import { Link } from 'react-router-dom';
import { getVerifyCredential } from '../../services/api';
import { checkCredential, getCredential, getSaveCredential } from '../../services/utils';

const Settings = () => {
  const [apiKey, setApiKey] = React.useState('');
  const [secretKey, setSecretKey] = React.useState('');
  const [verified, setVerified] = React.useState(false);

  React.useEffect(() => {
    checkCredential().then((res) => {
      setVerified(res);
    });
    getCredential().then((res) => {
      setApiKey(res.apiKey);
      setSecretKey(res.secretKey);
    })
  }, []);


  const updateApiKey = (value) => {
    setApiKey(value);
  };
  const updateSecretKey = (value) => {
    setSecretKey(value);
  };

  const verifyCredential = async () => {
    if (!apiKey || !secretKey){
      console.log('api and secret key is null value');
      return;
    }
    console.log(apiKey, secretKey);

    const verifyResult = await getVerifyCredential(apiKey, secretKey);

    if (verifyResult.data === false){
      setVerified(false);
    }else {
      setVerified(true);
    }
  };

  const saveCredential = async () => {
    if (!verified){
      return;
    }
    const saveResult = await getSaveCredential(apiKey, secretKey);
    console.log(saveResult);
  };

  return (
    <>
      <Div className={styles.layer} style={{marginTop: 30}}>
        <Div className={styles.layerTitle} children='Binance API Information:'/>

        <Div style={{flexDirection: 'column'}}>
          <Div style={{flexDirection: 'row'}}>
            <Div style={{width: '20%', justifyContent: 'flex-end', paddingRight: 10}}>API Key: </Div>
            <Div style={{width: '80%'}}>
              <input type='password' style={{width: '100%'}} value={apiKey} onChange={event => updateApiKey(event.target.value)}/>
            </Div>
          </Div>

          <Div style={{flexDirection: 'row', marginTop: 10}}>
            <Div style={{width: '20%', justifyContent: 'flex-end', paddingRight: 10}}>API Secret: </Div>
            <Div style={{width: '80%'}}>
              <input type='password' style={{width: '100%'}} value={secretKey} onChange={event => updateSecretKey(event.target.value)}/>
            </Div>
          </Div>

          <Div style={{flexDirection: 'row', marginTop: 10}}>
            <Div style={{width: '20%', justifyContent: 'flex-end', paddingRight: 10}}>Status: </Div>
            <Div>
              {
                verified ? (
                  <>Verified</>
                ) : (
                  <>No API Key configured</>
                )
              }
            </Div>
          </Div>

          <Div style={{flexDirection: 'row', marginTop: 10}}>
            <Div style={{width: '20%', paddingRight: 10}}/>
            <Div>
              <button onClick={verifyCredential}>Verify</button>
            </Div>
          </Div>
        </Div>
      </Div>

      <Div className={styles.funcLayer}>
        <button style={{marginRight: 10}} onClick={saveCredential}>
          <Link to={{pathname: '/'}}>Save</Link>
        </button>
        <button>
          <Link to={{pathname: '/'}}>Cancel</Link>
        </button>
      </Div>
    </>
  )
}

export default Settings;
