const express = require('express');
const mongoclient = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

const app = express();

const port = 8080;

app.listen(port, () => { console.log('Listening on port: ' + port); });


