const router = require('express').Router();
const {check, query} = require('express-validator/check');
const helpers = require('../helpers');

const validate = [
  check('product')
  .not().isEmpty().withMessage('Product code required.')
  .isLength({ min:1, max:25 }).withMessage('Product code must be 1-25 characters.'),
]

router.get('/', validate, (req, res) => {

    if ( !helpers.validationErrors(req, res) ) {

      let product = req.query.product;
      let filter = req.query.filter;

      res.status(200).send({message: 'image and product'});
    }

});

module.exports = router;
