const router = require('express').Router();
const middleware = require('../middleware');
const {check, body, parms, query, validationResult} = require('express-validator/check');

router.get('/:product', middleware.checkMethod(), middleware.sanitize(), middleware.validate(),
  check('product')
  .isLength({ min:1, max:25 }).withMessage('Product code should be supplied with length 1-25 characters.')
  .isAlphanumeric().withMessage('Product code should be alpha numeric e.g. DIR-615/E'),

  (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {

let product = req.params.product;
console.log('what : '+ product)

      res.send({message: 'image and product'});

    }

});

module.exports = router;
