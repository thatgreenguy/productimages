const router = require('express').Router();
const database = require('../database')
const helpers = require('../helpers')

router.get('/', async (req, res) => {

  try {

    let payload = {}

    dbData = await database.listProducts()

    payload.rowCount = dbData.rowCount
    payload.data = dbData.rows

    res.status(200).json( {success: payload} );    

  } catch ( err ) {
    helpers.errorPayload( err, res );
  }

});

module.exports = router;
