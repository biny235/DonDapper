const router = require('express').Router();
const Category = require('../../db/models');

router.get('', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => res.send(category))
    .catch(next);
});

module.exports = router;
