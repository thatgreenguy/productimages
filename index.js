const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const yaml = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = yaml.load('./swagger.yaml');

const routes = require('./app/routes');
const middleware = require('./app/middleware');
const {api_base, api_port} = require('./app/config');
const swaggerPath = api_base + 'docs';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined'));
app.use(api_base, routes);

app.use(swaggerPath, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get(swaggerPath, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(swaggerSpec);
});


app.listen(api_port, () => { 
  console.log('Listening on port: ' + api_port);
  console.log('API Docs available: ../docs');
 });

