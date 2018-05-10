const router = require('express').Router();
const stripe = require('stripe')('sk_test_gECrxB16INpkPVQHP1YGhl8K');

router.post('/pay', (req, res, next) => {
  stripe.charges.create(req.body, (err) => {
    if (err) {
      res.status(500).send({ error: err });
    }
  });
});

module.exports = router;
