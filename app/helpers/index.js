const config = require('../config');
const { validationResult } = require('express-validator');

const statusCodes = { '23505': 409 }

helpers = {}

// Trap and handle program errors and database errors
helpers.errorPayload = function( err, res, status = 500 ) {

  status =  typeof statusCodes[err.code] !== 'undefined' ? statusCodes[err.code] : status

  let payload = {error: {
    message: err.message,
    code: err.code,    
    detail: err.detail
    }
  };

  if ( status == 500 ) payload.error.info = `Unexpected Internal Error - API Request call failed. \
      This could be due to a temporary problem but is most likely a program error. \
      Check the ../docs and try again - if the problem persists contact support.`;

  if ( config.node_env == 'development' ) payload.error.stack = err.stack;

  res.status(status).send( payload );

}

helpers.validationErrors = function( req, res ) {

  let payload = {};
  let errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    payload.error = { errors: errors.array() }
    res.status(422).json( payload );
    return true;
  } else {
    return false;
  }

}

helpers.returnArrayOfWords = function( keywords ) {

  try {
    let words = keywords.split(' ');
    return words.map((word) => word.trim()).filter((word) => { return word.length });
  } catch( err ) {
    return []
  }
}

module.exports = helpers;
