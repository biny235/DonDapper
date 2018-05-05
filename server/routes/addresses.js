const router = require('express').Router();
const db = require('../../db');
const { Address } = db.models;

router.get('/', (req, res, next) => {
  Address.findAll()
    .then(addresses => {
      res.send(addresses);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Address.create(req.body)
    .then(address => res.send(address))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Address.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Address.findById(req.params.id)
    .then(address => address.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Address.findById(req.params.id)
    .then(address => {
      Object.assign(address, req.body.address);
      return address.save();
    })
    .then(address => {
      console.log(address);
      res.send(address);
    })
    .catch(next);
});

module.exports = router;
