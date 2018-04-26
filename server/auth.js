const jwt = require('jwt-simple');
const { User } = require('../db').models


const auth = (req, res, next)=>{
  User.exchangeToken(req.headers.token)
    .then(user => {
      if(user.id === req.params.id){
        return next()
      }
      else{
        throw {status: 401}
      }
    })

  
}

module.exports = auth;