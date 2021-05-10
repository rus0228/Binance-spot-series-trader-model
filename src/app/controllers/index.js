let crypto = require('crypto');
let axios = require('axios');
let config = require('../../config/config');




function verifyAccount(req, res) {
  const apiKey = req.query.apiKey;
  const secretKey = req.query.secretKey;
  const url = config.binance.urls.real.rest_url + '/api/v3/account';
  const timestamp = new Date().getTime();
  const queryString = `timestamp=${timestamp}`;
  createRequest(url, 'get', queryString, res, apiKey, secretKey);
}

const createRequest = (url, method, queryString, res, apiKey, secretKey) => {
  const signature = crypto.createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex');
  queryString = queryString + `&signature=${signature}`;
  axios({
    method: method,
    url : `${url}?${queryString}`,
    headers: {
      'X-MBX-APIKEY' : apiKey
    },
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    console.log(error);
    res.send(false);
  })
};

module.exports = {
  verifyAccount,
};
