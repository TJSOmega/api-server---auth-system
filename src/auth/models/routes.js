'use strict';

const express = require('express');
const authRouter = express.Router()

const users = require('../models/users.js')
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js')

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

authRouter.post('/signin', basicAuth, async (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user)
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const users = await User.find ({});
  const list = users.map(user => user.username);
  res.status(200).json(list)
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret route!')
});

module.exports = authRouter;

