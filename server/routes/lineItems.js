const router = require('express').Router();
const db = require('../../db');
const { LineItem } = db.models;

router.get('', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(order => {
      Object.assign(order, req.body);
      return order.save();
    })
    .then(order => res.send(order))
    .catch(next);
});

module.exports = router;
