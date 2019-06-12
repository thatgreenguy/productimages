const database = require('../database');
const util = require('../util');
const {check, validationResult} = require('express-validator/check')

module.exports = function(app, db) {

  app.post('/image', [
     check('product').isLength({min:1, max:25})  
   ], (req, res) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }

    const product = typeof req.body.product === 'string' ? req.body.product.trim() : "";
    const url = typeof req.body.url === 'string' ? req.body.url.trim() : "";
    const meta = typeof req.body.meta === 'string' ? req.body.meta.trim() : "";

    db.query( 'INSERT INTO images (product, url, meta) VALUES($1, $2, $3);', [product, url, meta])
    .then(result => {
      res.status(200).json({result: 'Image entry added'});
    })
    .catch( e => {
      res.status(500).json({'Error': e});
    })
  });

  app.get('/image', [
   ], (req, res) => {

console.log('REQ params: ' + JSON.stringify(req.params))
console.log('REQ query: ' + JSON.stringify(req.query))

    const product = typeof req.query.product === 'string' ? req.query.product.trim() : "";

    db.query( 'SELECT * FROM images WHERE product = $1;', [product])
    .then(result => {

      res.status(200).send({rowCount: result.rowCount, rows: result.rows});
    })
    .catch( e => {
      res.status(500).send({error: JSON.stringify(e)});
    })
  })

};
