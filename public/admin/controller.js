'use strict';
// Creates angular module: admin
var app = angular.module('admin', ['ngRoute']);

app.controller('AdminHomeCtrl', ['$scope', '$http', 'Contact', 'Project', 
	function($scope, $http, Contact, Project){
		$scope.contacts = [];
		$scope.projects = [];
		$scope.users = [];
		// Gets the current user
		$http.get('/me').succcess(function(user){
			$scope.me = user;
		});
		$http.get('/users').success(function(users){
			$scope.users = users;	
		});
		// Gets list of Contacts
    Contact.query(function(contacts) {
			$scope.contacts = contacts;
		});
		// Gets list of Projects
		Project.query(function(projects) {
			$scope.projects = projects;
		});
	}
]);