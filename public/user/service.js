'use strict';
// Creates angular module: project
var app = angular.module('project', ['ngResource']);

app.factory('Project', ['$resource', 
	function($resource){
		return $resource('/projects/:id', {
			id: '@_id'	
		}, {
			update:{
				method: 'PUT'
			}
		});
	}
]);