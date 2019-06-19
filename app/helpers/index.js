const config = require('../config');
const {validationResult} = require('express-validator/check');

helpers = {}

helpers.errorPayload = function( err, res ) {

  let payload = {};

  if ( config.node_env == 'development' ) {
    payload.error = {error: err};
  } else {
    payload.error = {error: `Internal error - run in debug mode for more details`};
  }

  res.status(400).send( payload );

}

helpers.validationErrors = function( req, res ) {

  let errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    res.status(400).json( {error: errors.array() });
    return true;
  } else {
    return false;
  }

}

module.exports = helpers;
