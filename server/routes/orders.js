const router = require('express').Router();
const Order = require('../../db/models');

router.get('', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

module.exports = router;
