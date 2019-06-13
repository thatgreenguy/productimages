const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({message: 'OK: Rest API is alive!'});
});

module.exports = router;
