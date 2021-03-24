'use strict';

const express = require('express');
const authRouter = express.Router()

const User = require('./models/users.js')
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const permissions = require('./middleware/acl.js')

authRouter.get('/', (req, res) => {
  res.render(process.cwd() + '/src/views/index.ejs');
});

authRouter.get('/signin', (req, res) => {
  res.render(process.cwd() + '/src/views/signin.ejs');
})

authRouter.get('/signup', (req, res) => {
  res.render(process.cwd() + '/src/views/signup.ejs');
})

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const record = await user.save();
    const output = {
      user: record,
      token: record.token
    };
    res.status(201).json(output)
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  console.log(user)
  res.status(200).json(user);
  // you could change this to something like res.redirect(/notes)
  // and that SHOULD return all the notes in json (unless you write a view for it)
});

authRouter.get('/users', bearerAuth, async (req, res) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list)
});

authRouter.get('/secret', bearerAuth, async (req, res) => {
  res.status(200).send('Welcome to the secret route!')
});

module.exports = authRouter;
