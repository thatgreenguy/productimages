const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const expressValidator = require('express-validator');

const routes = require('./app/routes');
const middleware = require('./app/middleware');
const {api_base, api_port} = require('./app/config');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined'));
app.use(expressValidator());

app.use(api_base, routes);

app.listen(api_port, () => { console.log('Listening on port: ' + api_port); });

