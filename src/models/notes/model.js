'use strict'

const mongoose = require('mongoose');

// const schemaOptions = {
//   { toJSON: { virtuals: true }},
//   { timestamps: {
//       createdAt: 'created_at',
//       updatedAt: 'updated_at'
//   }},
// };

let timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' };

const notesSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { toJSON: { virtuals: true}}, timestamps);

module.exports = new mongoose.model('notes', notesSchema);
