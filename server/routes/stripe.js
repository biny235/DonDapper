const router = require('express').Router();
const stripe = require('stripe')('sk_test_gECrxB16INpkPVQHP1YGhl8K');

router.get('/pay', (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  stripe.charges.create({
    source: token.id,
    receipt_email: token.email
  })
    .catch(next);
});

module.exports = router;
