var core = require("../controllers/core"),
	users = require('../controllers/user'),
	projects = require('../controllers/project'),
	contacts = require('../controllers/contact'),
	admin = require('../controllers/admin');

module.exports = function(app){
	// Shows the Home page
  app.route('/').get(core.index);
	// Shows the Admin page
	app.route('/admin').get(admin.index);
	// Shows all projects and Creates new projects
	app.route('/projects')
    .get(projects.all)
    .post(users.requiresLogin, projects.create);
	// Shows a project, Updates a project, and Deletes a project
  app.route('/projects/:projectId')
    .get(users.isMongoId, projects.show)
    .put(users.isMongoId, users.requiresAdmin, projects.update)
    .delete(users.isMongoId, users.requiresAdmin, projects.destroy);
	// Binds projectId to a project
  app.param('projectId', projects.project);
	// Shows all contacts and Creates new contacts
	app.route('/contacts')
    .get(contacts.all)
    .post(users.requiresLogin, contacts.create);
	// Shows a contact, Updates a contact, and Deletes a contact
  app.route('/contacts/:contactId')
    .get(users.isMongoId, contacts.show)
    .put(users.isMongoId, users.requiresAdmin, contacts.update)
    .delete(users.isMongoId, users.requiresAdmin, contacts.destroy);
	// Binds contactId to a contact
  app.param('contactId', contacts.contact);
	// User routes
	app.route('/logout')
    .get(users.signout);
  app.route('/me')
    .get(users.me);
	app.route('/users')
		.get(users.requiresAdmin, users.list)
	app.route('/users/:userId')
		.get(users.isMongoId, users.me)
		.delete(users.isMongoId, users.requiresAdmin, users.destroy);
  // Setting up the users api
  app.route('/register')
    .post(users.create);
  // Setting up the userId param
  app.param('userId', users.user);
  // AngularJS route to check for authentication
  app.route('/loggedin')
    .get(function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });
  // Setting the local strategy route
  app.route('/login')
    .post(function(req, res) {
			req.login(user, function(err) {
  			if (err) { return next(err); }
  			return res.redirect('/users/' + req.user.username);
			});
    });
};
