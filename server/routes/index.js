const router = require('express').Router();


router.get('/', (req, res, next)=>{
  res.send('Hi')
});


module.exports = router;