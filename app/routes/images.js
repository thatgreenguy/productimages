const router = require('express').Router();
const database = require('../database');
const helpers = require('../helpers');
const { check } = require('express-validator');

router.get('/', [
  check('product').not().isEmpty().withMessage('Product code required.'),
  check('product').isLength({ min:1, max:25 }).withMessage('Product should be 1-25 characters.').trim().stripLow(),
  check('filter').trim().stripLow()
], async (req, res) => {

    try {
      if ( !helpers.validationErrors(req, res) ) {
        let product = req.query.product;
        let filters = helpers.returnArrayOfWords( req.query.filter );

        dbData = await database.listImageUrls(product, filters);

        let payload = {};
        payload.rowCount = dbData.rowCount;
        payload.rows = dbData.rows;

        res.status(200).json( {success: payload} );
      }

    } catch ( err ) {
      helpers.errorPayload( err, res );
    }      
});

router.delete('/:id', [
  check('id').not().isEmpty().withMessage('Id of record to be deleted required.'),
  check('id').isInt({ gt: 0 }).withMessage('Id expected to be an Integer > 0.'),
  check('id').trim().stripLow()
], async (req, res) => {

    try {
      if ( !helpers.validationErrors(req, res) ) {

        let id = req.params.id;console.log('well: ', id);
        dbData = await database.deleteImage(id);

        if ( dbData.rowCount == 0 ) {
          helpers.errorPayload('Delete request failed - check ID', res, 422);
        } else {
          res.status(204).end();
        }
      }

    } catch ( err ) {
      helpers.errorPayload( err, res );
    }      
});

module.exports = router;
