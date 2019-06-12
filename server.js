const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const {api_port} = require('./app/config');
const db = require('./app/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

require('./app/routes')(app, db);

app.listen(api_port, () => { console.log('Listening on port: ' + api_port); });


