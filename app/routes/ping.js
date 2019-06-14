const router = require('express').Router();

router.get('/', (req, res) => {
  
  let errors = [];

// express validate the method for you it seems!
  if ( ['GET'].includes(req.method) ) {

    return res.send({message: 'OK: Rest API is alive!'});
    
  }
  else {

    return res.status(400).send({errors: 'Method unsupported use GET'});

  };
});

module.exports = router;
