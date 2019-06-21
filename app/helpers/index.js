const config = require('../config');
const { validationResult } = require('express-validator');

helpers = {}

helpers.errorPayload = function( err, res, status = 400 ) {

  let payload = {};

  if ( config.node_env == 'development' ) {
    payload.error = {errors: err};
  } else {
    payload.error = {errors: `API Request call failed. Possibly a temporary problem or badly formed request. Try again after checking ../docs and the 
details of your request. If the problem persists contact support.`};
  }

  res.status(status).json( payload );

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
