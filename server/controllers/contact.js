'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Contact = require('../models/contact'),
  _ = require('lodash');


/**
 * Find contact by id
 */
exports.contact = function(req, res, id) {
	Contact.findOne({ _id:id}).exec(function(err, contact){
		if (err) {
      return res.status(500).json({
        error: 'Cannot find the contact'
      });
    }
    res.json(contact);
	});
};

/**
 * Create an contact
 */
exports.create = function(req, res) {
  var contact = new Contact(req.body);

  contact.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the contact'
      });
    }
    res.json(contact);

  });
};

/**
 * Update an contact
 */
exports.update = function(req, res) {
  var contact = req.contact;

  contact = _.extend(contact, req.body);

  contact.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the contact'
      });
    }
    res.json(contact);

  });
};

/**
 * Delete an contact
 */
exports.destroy = function(req, res) {
  var contact = req.contact;

  contact.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the contact'
      });
    }
    res.json(contact);
  });
};

/**
 * Show an contact
 */
exports.show = function(req, res) {
  res.json(req.contact);
};

/**
 * List of Contacts
 */
exports.all = function(req, res) {
  Contact.find().sort('-created').populate('contact', 'viewed name email').exec(function(err, contacts) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the contacts'
      });
    }
    res.json(contacts);
  });
};
