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

router.post('/', [
  check('product').not().isEmpty().withMessage('Product code required.'),
  check('product').isLength({ min:1, max:25 }).withMessage('Product should be 1-25 characters.').trim().stripLow(),
  check('image').not().isEmpty().withMessage('Image url required.'),
  check('meta').not().isEmpty().withMessage('At least one descriptive word required e.g. Front, Back, Left etc.'),
  check('meta').trim().stripLow()
], async (req, res) => {

    try {
      if ( !helpers.validationErrors(req, res) ) {

        let product = req.body.product;
        let image = req.body.image;
        let meta = req.body.meta;

        dbData = await database.createImage(product, image, meta);

        if ( dbData.rowCount == 0 ) {
          helpers.errorPayload('Create request failed - check error details', res, 422);
        } else {
          res.status(201).end();
        }
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
          helpers.errorPayload( new Error('Delete request failed - check Id'), res, 422);
        } else {
          res.status(204).end();
        }
      }
    } catch ( err ) {
      helpers.errorPayload( err, res );
    }      
});

router.put('/:id', [
  check('id').not().isEmpty().withMessage('Id of record to be updated required.'),
  check('id').isInt({ gt: 0 }).withMessage('Id expected to be an Integer > 0.'),
  check('id').trim().stripLow(),
  check('product').not().isEmpty().withMessage('Product code required.'),
  check('product').isLength({ min:1, max:25 }).withMessage('Product should be 1-25 characters.').trim().stripLow(),
  check('image').not().isEmpty().withMessage('Image url required.'),
  check('meta').not().isEmpty().withMessage('At least one descriptive word required e.g. Front, Back, Left etc.'),
  check('meta').trim().stripLow()
], async (req, res) => {

    try {
      if ( !helpers.validationErrors(req, res) ) {

        let id = req.params.id;console.log('well: ', id);
        let product = req.body.product;
        let image = req.body.image;
        let meta = req.body.meta;

        dbData = await database.updateImage(id, product, image, meta);

        if ( dbData.rowCount == 0 ) {
          helpers.errorPayload(new Error('Update request failed - check ID'), res, 422);
        } else {
          res.status(204).end();
        }
      }
    } catch ( err ) {
      helpers.errorPayload( err, res );
    }      
});

module.exports = router;
