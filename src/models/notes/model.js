'use strict'

const mongoose = require('mongoose');

const schemaOptions = {
  { toJSON: { virtuals: true }},
  { timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  },
};

const notessSchema = mongoose.Schema({
  title: { String, required: true },
  body: { String, required: true },
}, schemaOptions);

module.exports = new mongoose.model('notes', notesSchema);
