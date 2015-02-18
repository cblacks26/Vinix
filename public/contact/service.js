'use strict';
// Creates angular module: contact
var app = angular.module('contact', ['ngResource']);

app.factory('Contact', ['$resource', 
	function($resource){
		return $resource('/contacts/:id', {
			id: '@_id'	
		}, {
			update:{
				method: 'PUT'
			}
		});
	}
]);