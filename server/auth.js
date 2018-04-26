const jwt = require('jwt-simple');

const auth = (req, res, next)=>{
  console.log(req.headers.token)
  console.log(req.params.id)
  next()
}

module.exports = auth;