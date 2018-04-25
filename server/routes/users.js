const router = require('express').Router();
const db = require('../../db');
const { User, Order, LineItem } = db.models;


router.get('/', (req, res, next) => {
  User.exchangeToken(req.headers.token)
    .then(user => res.send(user))
    .catch(next);
});

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.user)
    .then(token => {
      res.send(token);
    })
    .catch(next);
});

router.get('/:id/cart', (req, res, next) => {
  User.findOrCreateCart(req.params.id)
    .spread(cart => res.send(cart))
    .catch(next);
});

router.get('/:id/orders', (req, res, next) => {
  User.findById(req.params.id)
    .then(user =>
      user.getOrders({
        where: { status: 'order' },
        include: [{ model: LineItem }]
      }))
    .then(orders => {
      console.log(orders);
      res.send(orders);
    })
    .catch(next);
});

module.exports = router;
