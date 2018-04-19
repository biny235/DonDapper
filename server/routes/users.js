const router = require('express').Router();
const User = require('../../db/models');

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

module.exports = router;
