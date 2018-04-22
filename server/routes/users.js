const router = require('express').Router();
const db = require('../../db');
const { User, Order } = db.models;

router.get('', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(next);
});

router.get('/:id/cart', (req, res, next)=>{
  User.findOrCreateCart(req.params.id)
    .then(cart => res.send(cart))
    .catch(next)
});

router.get('/:id/orders', (req, res, next)=>{
  Order.findAll({where:{userId: req.params.id, status: 'order'}})
    .then(orders => res.send(orders))
    .catch(next)
});

module.exports = router;
