'use strict'

// 3rd party
const fs = require('fs'); // this is to read file name and build model properly
const express = require('express');

// internal
const Collection = require('../models/data-collection.js');
const bearerAuth = require('../auth/middleware/bearer.js');
const restrict = require('../auth/middleware/acl.js');
const aclRouter = express.Router();

// key-value data structure to hold models
const models = new Map();

// take name of model from url params and create accordingly
aclRouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  // if our models map already has created this collection
  // set the req.model to that collection
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    // otherwise we need to instantiate the collection
    // build the file path from the param value and import the schema
    const fileName = `${__dirname}/../models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    } else {
      next('Invalid model parameter');
    }
  }
})

// tokens are required on all model routes
aclRouter.use(bearerAuth);

// anyone with a valid token can use get methods
aclRouter.get('/:model', handleGet);
aclRouter.get('/:model/:id', handleGet);
// restricted to users with CREATE capability
aclRouter.post('/:model', restrict('create'), handleCreate);
// restricted to users with UPDATE capability
aclRouter.put('/:model/:id', restrict('update'), handleUpdate);
aclRouter.patch('/:model/:id', restrict('update'), handleUpdate);
// restricted to users with DELETE capability
aclRouter.delete('/:model/:id', restrict('delete'), handleDelete);

async function handleGet(req, res) {
  let reply;
  if (req.params.id) {
    reply = await req.model.get(req.params.id)
  } else {
    reply = await req.model.get();
  }
  res.status(200).json(reply);
}

async function handleCreate(req, res) {
  let newRecord = await req.model.create(req.body);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  let updated = await req.model.update(req.params.id, req.body);
  res.status(200).json(updated);
}

async function handleDelete(req, res) {
  let deleted = await req.model.delete(req.params.id);
  res.status(200).json(deleted);
}

module.exports = aclRouter;
