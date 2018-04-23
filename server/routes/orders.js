const router = require('express').Router();
const db = require('../../db');
const { Order } = db.models;

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => {
      res.send(orders);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => {
      Object.assign(order, req.body);
      return order.save();
    })
    .then(order => res.send(order))
    .catch(next);
});

module.exports = router;
