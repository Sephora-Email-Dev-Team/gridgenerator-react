/* eslint-disable no-console */
const cors = require('cors');
const request = require('request');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8889;

app.use(cors());

app.get('/skus/:sku', (req, res) => {
  const regionPath = (req.query.country === 'ca') ? 'ca/en/' : '';
  const url = `https://www.sephora.com/${regionPath}${path.join('api/catalog/skus', req.params.sku)}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
      res.send(body);
    } else {
      res.status(500).send(error);
    }
  });
});

app.use(express.static('./client/dist'));

app.listen(port, () => console.log(`Server is running on ${port} port`));
