'use strict';

var mongoose = require('mongoose'),
  Project = require('../models/project'),
	fs = require('fs'),
  _ = require('lodash');

/**
 * Find project by id
 */
exports.project = function(req, res, next, id) {
  Project.load(id, function(err, project) {
    if (err) return next(err);
    if (!project) return next(new Error('Failed to load project ' + id));
    req.project = project;
    next();
  });
};

/**
 * Create an project
 */
exports.create = function(req, res) {
  var project = new Project(req.body);

  project.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the project' + err
      });
    }
    res.json(project);

  });
};

/**
 * Update an project
 */
exports.update = function(req, res) {
  var project = req.project;

  project = _.extend(project, req.body);

  project.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the project'
      });
    }
    res.json(project);

  });
};

/**
 * Delete an project
 */
exports.destroy = function(req, res) {
  var project = req.project;

  project.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the project'
      });
    }
    res.json(project);
  });
};

/**
 * Show an project
 */
exports.show = function(req, res) {
  res.json(req.project);
};

/**
 * List of Projects
 */
exports.all = function(req, res) {
  Project.find().sort('-posted').populate('project', 'order name image url').exec(function(err, projects) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the projects'
      });
    }
    res.json(projects);
  });
};
