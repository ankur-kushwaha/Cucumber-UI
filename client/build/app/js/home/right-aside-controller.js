(function() {
	'use strict';

	/**
	 * @ngdoc object
	 * @name home.controller:RightAsideCtrl
	 * 
	 * @description
	 * 
	 */
	angular.module('home').controller('RightAsideCtrl', RightAsideCtrl);

	function RightAsideCtrl($http, $scope, featureName) {
		var vm = this;
		vm.ctrlName = 'RightAsideCtrl';

		vm.featureName = featureName;

		vm.types = [ 'css', 'id', 'binding', 'model', 'name', 'linkText', 'partialLinkText', 'tagName', 'xpath' ];

		$http.get('steps/objects', {}).then(function(res) {
			vm.pageObjects=res.data;
		})

		vm.addPage = function() {
			var pageName = "New Page"
			vm.pageObjects.push({
				name:pageName,
				objects:[]
			})
		}

		vm.addNewObject = function(i) {
			vm.pageObjects[i].objects.push({
				type:'css'
			})
			
		}

		vm.saveObjects = function() {
			$http.post('steps/objects', {
				objects : vm.pageObjects
			}).then(function(res) {
				console.log(res);
			})
		}

		$scope.$on('modal.closing', function() {
			console.log('closing')
			vm.saveObjects();
		})

		vm.pageObjects = [ {
			name : "Global",
			objects : [ {
				"type" : "linkText",
				"name" : "Guide",
				"value" : "Developer Guide"
			} ]
		}, {
			name : "Page1",
			objects : [ {
				"type" : "linkText",
				"name" : "Guide",
				"value" : "Developer Guide"
			} ]
		}, {
			name : "Page2",
			objects : [ {
				"type" : "linkText",
				"name" : "Guide",
				"value" : "Developer Guide"
			} ]
		} ];

		vm.groups = [ {
			title : 'Dynamic Group Header - 1',
			content : 'Dynamic Group Body - 1'
		}, {
			title : 'Dynamic Group Header - 2',
			content : 'Dynamic Group Body - 2'
		} ];

	}
}());

//# sourceMappingURL=right-aside-controller.js.map
