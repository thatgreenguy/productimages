const router = require('express').Router();
const database = require('../database');
const helpers = require('../helpers');
const {check, query} = require('express-validator/check');

const validate = [
  check('product')
  .not().isEmpty().withMessage('Product code required.')
  .isLength({ min:1, max:25 }).withMessage('Product code must be 1-25 characters.')
  .trim().stripLow(),
  check('filter').trim().stripLow()
]

router.get('/', validate, async (req, res) => {

    if ( !helpers.validationErrors(req, res) ) {

      try {

        let product = req.query.product;
        let filters = helpers.returnArrayOfWords( req.query.filter );

        let payload = {};

        dbData = await database.listImageUrls(product, filters);

        payload.rowCount = dbData.rowCount;
        payload.rows = dbData.rows;
        res.status(200).send( {success: payload} );

      } catch ( err ) {
        helpers.errorPayload( err, res );
      }      
    }

});

module.exports = router;
