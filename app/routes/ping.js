const router = require('express').Router();

router.get('/', (req, res) => {
  
  let payload = {};
  payload.success = {data: 'OK'};

  res.status(200).send(payload);

});

module.exports = router;
