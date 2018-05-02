const express = require('express');
const app = express();
const path = require('path');
const googleSecret = process.env.G_SECRET || require('../secret').google;

const googleMapsClient = require('@google/maps').createClient({
  key: googleSecret,
  Promise: Promise
});

app.use(require('body-parser').json());

app.use('/', express.static(path.join(__dirname + '/../dist')));
app.use('/dist', express.static(path.join(__dirname + '/../node_modules')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.post('/google/getpredictions', (req, res, next)=>{
  googleMapsClient.placesAutoComplete({input: req.body.input}).asPromise()
    .then(resp => resp.json.predictions)
    .then(predictions => res.send(predictions))
})
app.post('/google/getplace', (req, res, next) =>{
  googleMapsClient.reverseGeocode({place_id: req.body.query,}).asPromise()
  .then(resp => res.send(resp.json.results))
  .catch(next)
})

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;
