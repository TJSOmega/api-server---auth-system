'use strict';

const mongoose = require('mongoose');

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  create(objectDetails) {
    let newRecord = new this.model(objectDetails);
    newRecord.save((err) => {
      if (err) { databaseError(err) }
    })
    return newRecord;
  }

  get(id) {
    if (id) {
      return this.model.findById({ _id: id }, (err, record) => {
        if (err){ this.databaseError(err) }
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
    return this.model.findByIdAndUpdate(id, record, { new: true }, (err, record) => {
      if (err){ databaseError(err) }
    })
  }

  delete(id) {
    return this.model.findOneAndDelete({ _id: id}, {new: false}, (err, record) => {
      if (err){ databaseError(err) }
      return record;
    })
  }

  databaseError (err) {
    throw new Error('Database Error!');
  }

}

module.exports = DataCollection;
