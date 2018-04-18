const app = require('./server/app');

const db = require('./db');

db.syncAndSeed()
  .then(()=>{console.log('seeded')})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));