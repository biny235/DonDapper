const router = require('express').Router();
const db = require('../../db');
const { User, Order, LineItem } = db.models;

router.get('/', (req, res, next) => {
  res.send('ok')
});

router.post('/', (req, res, next) => {
  User.authenticate(req.body.user)
    .then(user => res.send(user))
    .catch(next);
});

router.get('/:id/cart', (req, res, next)=>{
  User.findOrCreateCart(req.params.id)
    .spread((cart) => res.send(cart))
    .catch(next)
});

router.get('/:id/orders', (req, res, next)=>{
  User.findById(req.params.id)
    .then(user => user.getOrders({include: [{model: LineItem}]}))
    .then(orders => res.send(orders))
    .catch(next)
});

module.exports = router;
