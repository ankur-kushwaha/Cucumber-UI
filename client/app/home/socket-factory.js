(function() {
	'use strict';

	/**
	 * @ngdoc service
	 * @name home.factory:Socket
	 * 
	 * @description
	 * 
	 */
	angular.module('home').factory('Socket', Socket);

	function Socket($rootScope) {
		var SocketBase = {};

		var socket = io.connect();
		SocketBase.on = function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments; 
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		}

		SocketBase.emit = function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}

		return SocketBase;
	}
}());
