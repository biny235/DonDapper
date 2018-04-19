const router = require('express').Router();
const LineItem = require('../../db/models');

router.get('', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

module.exports = router;
