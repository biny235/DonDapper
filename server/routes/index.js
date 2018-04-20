const router = require('express').Router();

router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/orders', require('./orders'));
router.use('/lineItems', require('./lineItems'));
router.use('/users', require('./users'));

module.exports = router;
