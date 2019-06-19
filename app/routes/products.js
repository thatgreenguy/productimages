const router = require('express').Router();
const database = require('../database')
const helpers = require('../helpers')

router.get('/', async (req, res) => {

  let payload = {}

  try {

    dbData = await database.listProducts()

    payload.rowCount = dbData.rowCount
    payload.data = dbData.rows
    res.status(200).send( {success: payload} );    

  } catch ( err ) {
    helpers.errorPayload( err, res );
  }

});

module.exports = router;
