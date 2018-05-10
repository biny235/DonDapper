const router = require('express').Router();
const db = require('../../db');
const auth = require('../auth');
const { User, LineItem } = db.models;

router.get('/', (req, res, next) => {
  User.exchangeToken(req.headers.token)
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

router.get('/all', (req, res, next) => {
  User.exchangeToken(req.headers.token)
    .then(user => {
      if (!user.admin) next({ status: 401 });
      User.findAll({
        where: { id: { $ne: user.id } },
        order: ['firstName']
      }).then(users => {
        res.send(users);
      });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body.user)
    .then(user => res.send(user))
    .catch(next);
});

router.put('/:id', auth, (req, res, next) => {
  if (!req.user) next({ status: 401 });
  User.findById(req.params.id)
    .then(user => {
      console.log(req.body.user.admin, user.admin);
      Object.assign(user, req.body.user);
      return user.save();
    })
    .then(user => {
      console.log(user.admin);
      res.send(user);
    })
    .catch(next => {
      console.log(next);
      res.send(next);
    });
});

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.user)
    .then(token => {
      res.send(token);
    })
    .catch(next);
});

router.get('/:id/cart', auth, (req, res, next) => {
  User.findOrCreateCart(req.params.id)
    .spread(cart => res.send(cart))
    .catch(next);
});

router.get('/:id/orders', auth, (req, res, next) => {
  User.findById(req.params.id)
    .then(user =>
      user.getOrders({
        where: { status: 'order' },
        include: [{ model: LineItem }]
      })
    )
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:id/addresses', auth, (req, res, next) => {
  User.findById(req.params.id)
    .then(user =>
      user.getAddresses({
        where: { userId: user.id }
      })
    )
    .then(addresses => {
      res.send(addresses);
    })
    .catch(next);
});

module.exports = router;
