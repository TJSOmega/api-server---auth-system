const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session)

const store = new MongoDbSession({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
})


const cookieSession = session({
  secret: 'This is our cookie string',
  resave: false,
  saveUninitialized: false,
  store: store,
})



module.exports = cookieSession