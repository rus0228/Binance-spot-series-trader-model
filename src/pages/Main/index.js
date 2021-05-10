import React from 'react';
import styles from './index.css';
import Div from '../../components/Div';
import { Link } from 'react-router-dom';
import { checkCredential, getCurrent } from '../../services/utils';

const Main = () => {
  const [verified, setVerified] = React.useState(false);
  const [log, setLog] = React.useState([]);

  const [isStopLoss, setStopLoss] = React.useState()
  const updateStopLoss = () => {
    setStopLoss(!isStopLoss);
  }


  React.useEffect(() => {
    checkCredential().then((res) => {
      setVerified(res);
      if (res){
        setLog([`${getCurrent()} Binance API successfully authenticated.`])
      }else {
        setLog([`${getCurrent()} Binance API authentication failed.`])
      }
    });
  }, []);


  return (
    <>
      <Div className={styles.funcLayer} style={{fontSize: 30}}>
        <Link to={{pathname: '/settings'}} style={{textDecoration: 'none', color: 'grey'}}>
          &#9881;
        </Link>
      </Div>
      <Div className={styles.layer}>
        <Div className={styles.layerTitle} children='Base Assets:'/>
        <Div>
          <select style={{width: '100%'}} disabled={!verified}>
            <option value='0'>BTC</option>
            <option value='1'>USDT</option>
          </select>
        </Div>
        <Div style={{justifyContent: 'flex-end'}}>
          Available: 0.00000000
        </Div>
        <Div style={{justifyContent: 'flex-end'}}>
          Locked: 0.00000000
        </Div>
        <Div style={{justifyContent: 'flex-end'}}>
          Total: 0.00000000
        </Div>
      </Div>

      <Div className={styles.layer}>
        <Div className={styles.layerTitle} children='Buy Order:'/>
        <Div style={{flexDirection: 'row'}}>
          <Div style={{flexDirection: 'row', width: '50%'}}>
            <div>Order Size: </div>
            <input type='number' disabled={!verified}/>
          </Div>
          <Div style={{flexDirection: 'row', width: '50%'}}>
            <input type='checkbox' checked={isStopLoss} onChange={updateStopLoss} disabled={!verified}/>
            <div>SL %: </div>
            <input type='number' disabled={!verified || !isStopLoss}/>
          </Div>
        </Div>
      </Div>

      <Div className={styles.layer}>
        <Div className={styles.layerTitle} children='Sell Order:'/>
        <Div style={{flexDirection: 'row'}}>
          <Div style={{flexDirection: 'row', width: '50%'}}>
            <div>Split Cut: </div>
            <input type='checkbox' disabled={!verified}/>
          </Div>
          <Div style={{flexDirection: 'row', width: '50%'}}>
            <div>TP %: </div>
            <input type='number' disabled={!verified}/>
          </Div>
        </Div>

        <Div style={{flexDirection: 'row'}}>
          <Div className={styles.subLayer}>
            <Div className={styles.layerTitle} children='Slice1'/>
            <Div style={{flexDirection: 'row'}}>
              <Div style={{flexDirection: 'row', width: '50%'}}>
                <input type='number'/>
              </Div>
              <Div style={{flexDirection: 'row', width: '50%'}}>
                <div>TP%:</div>
                <input type='number'/>
              </Div>
            </Div>
          </Div>

          <Div className={styles.subLayer}>
            <Div className={styles.layerTitle} children='Slice2'/>
            <Div style={{flexDirection: 'row'}}>
              <Div style={{flexDirection: 'row', width: '50%'}}>
                <input type='number'/>
              </Div>
              <Div style={{flexDirection: 'row', width: '50%'}}>
                <div>TP%:</div>
                <input type='number'/>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>

      <Div className={styles.layer}>
        <Div className={styles.layerTitle} children='Pump Token:'/>
        <Div style={{flexDirection: 'row'}}>
          <Div>
            <input type='checkbox'/>
          </Div>
          <Div>I made sure that the above parameters are accurate</Div>
        </Div>
        <Div style={{justifyContent: 'center'}} children='Coin/Token Name:'/>
        <Div>
          <input type='text' style={{width: '100%'}}/>
        </Div>
      </Div>

      <Div className={styles.layer}>
        <Div className={styles.layerTitle} children='Log'/>
        <Div className={styles.loggingArea}>
          {
            log.map(item => {
              return (
                <div key={item}>{item}</div>
              )
            })
          }
        </Div>
      </Div>
    </>
  );
};

export default Main;

