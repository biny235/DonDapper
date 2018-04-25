const router = require('express').Router();
const db = require('../../db');
const { Order, LineItem } = db.models;

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
  Order.findById(req.params.id, { include: [{ all: true }] })
    .then(order => res.send(order))
    .catch(next);
});

router.get('/:id/lineItems', (req, res, next) => {
  LineItem.findAll({ where: { orderId: req.params.id } })
    .then(order => res.send(order))
    .catch(next);
});

router.put('/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.findOrCreate({
    where: { orderId: req.params.orderId },
    defaults: { quantity: 1, orderId: req.params.orderId }
  })
    .spread(lineItem => {
      Object.assign(lineItem, req.body);
      return lineItem.save();
    })
    .then(lineItem => res.send(lineItem))
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
