const router = require('express').Router();

router.use('/ping', require('./ping'));
router.use('/images', require('./images'));
router.use('/products', require('./products'));

module.exports = router;
