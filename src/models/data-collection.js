'use strict';

const mongoose = require('mongoose');

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  create(objectDetails) {
    let newRecord = new this.model(objectDetails);
    newRecord.save((err, record) => {
      if (err) { databaseError(err) }
      return record;
    })
  }

  get(id) {
    if (id) {
      return this.model.findOneById({ id }, (err, record) => {
        if (err){ databaseError(err) }
        return record;
      })
    } else {
      return this.model.find({}, (err, records) => {
        if (err){ databaseError(err) }
        return records;
      })
    }
  }

  update(id, record) {
    // new option here returns the updated record instead of the old one
    return this.model.findOneByIdAndUpdate({ id, record, { new: true } }, (err, record) => {
      if (err){ databaseError(err) }
    })
  }

  delete(id) {
    return this.model.findOneByIdAndDelete({ id }), (err, record) => {
      if (err){ databaseError(err) }
    }
  }

  const databaseError = (err) => {
    throw new Error('Database Error!');
  }

}

module.exports = DataCollection;
