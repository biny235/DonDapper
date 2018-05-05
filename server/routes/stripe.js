const router = require('express').Router();
const stripe = require('stripe')('sk_test_gECrxB16INpkPVQHP1YGhl8K');

router.get('/pay', (req, res, next) => {
  const { token, chargeAmount } = req.body;
  stripe.charges.create({
    amount: chargeAmount,
    currency: 'usd',
    source: token
  }, (err) => {
    if (err && err.type === 'StripeCardError') {
      console.log('card declined');
    }
  });
});

module.exports = router;
