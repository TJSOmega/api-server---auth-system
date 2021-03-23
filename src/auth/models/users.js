'use strict';

const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: { type: String, required: true, default: 'user', enum: ['user', 'editor', 'admin'] },
});

users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  }
  return jwt.sign(tokenObject, process.env.SECRET)
})

users.virtual('capabilities').get(function () {
  let acl = {
    user: ['read'],
    editor: ['read', 'write', 'update'],
    admin: ['read', 'write', 'update', 'delete']
  };
  return acl[this.role]
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
});

users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne ({ username })
  const valid = await bcrypt.compare(password, user.password)
  if (valid) {return user;}
  throw new Error ('Invalid User')
}

users.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = await jwt.verify(token, process.env.SECRET);
    const user = await this.findOne({ username: parsedToken.username })
    if (user) { return user; }
    throw new Error('User Not Found');
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = mongoose.model('users', users)
