const router = require('express').Router();
const db = require('../../db');
const auth = require('../auth');
const { User, Order, LineItem } = db.models;

router.get('/', auth, (req, res, next) => {
  User.exchangeToken(req.headers.token)
    .then(user => res.send(user))
    .catch(next);
});
router.post('/', (req, res, next) => {
  User.create(req.body.user)
    .then(user => res.send(user))
    .catch(next);
});
router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body.user);
      return user.save();
    })
    .then(user => res.send(user));
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

router.get('/:id/orders', auth, (req, res, next) => {
  User.findById(req.params.id)
    .then(user =>
      user.getOrders({
        where: { status: 'order' },
        include: [{ model: LineItem }]
      })
    )
    .then(orders => res.send(orders))
    .catch(next);
});

module.exports = router;
