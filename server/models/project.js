'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  posted: {
    type: Date,
    default: Date.now
  },
	created: {
		type: String,
		required: true,
		trim: true
	},
	order: {
		type: Number,
		required: true
	},
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
		type: String,
		required: true,
		trim: true
	},
	description: {
    type: String,
    required: true,
    trim: true
  },
  short_description: {
    type: String,
    required: true,
    trim: true
  },
	image: {
    type: String,
    required: true,
    trim: true
  },
	client_name: {
    type: String,
    required: true,
    trim: true
  },
	services: {
    type: String,
    required: true,
    trim: true
  }
});

/**
 * Statics
 */
ProjectSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('project', 'name image url').exec(cb);
};

module.exports = mongoose.model('Project', ProjectSchema);