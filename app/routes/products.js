const router = require('express').Router();

router.get('/', (req, res) => {

  res.send({message: 'product list'});

});

module.exports = router;
