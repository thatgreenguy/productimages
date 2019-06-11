const express = require('express');
const bodyparser = require('body-parser');
const {api_port} = require('./app/config');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }) );

require('./app/routes')(app, {});

app.listen(api_port, () => { console.log('Listening on port: ' + api_port); });


