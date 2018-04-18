const express = require('express');
const app = express();
const path = require('path')

app.use('/', express.static(path.join(__dirname + '/../dist')));

app.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname + '/../dist/index.html'))
});

app.use('/api', require('./routes'));
module.exports = app;