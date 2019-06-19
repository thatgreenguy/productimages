const config = require('../config');
const {validationResult} = require('express-validator/check');

helpers = {}

helpers.errorPayload = function( err, res ) {

  let payload = {};

  if ( config.node_env == 'development' ) {
    payload.error = err;
  } else {
    payload.error = `Internal error - run in debug mode for more details`;
  }

  res.status(400).send( payload );

}

helpers.validationErrors = function( req, res ) {

  let errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    res.status(400).json( errors.array() );
  } else {
    return false;
  }

}

module.exports = helpers;
