'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  viewed: {
    type: Boolean,
		required: true,
		default: false
	},
  name: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
		trim: true
  }
});

module.exports = mongoose.model('Contact', ContactSchema);