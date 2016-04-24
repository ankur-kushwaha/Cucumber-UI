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

		vm.featureName = featureName.replace(" ","_").toLowerCase();

		vm.types = [ 'css', 'id', 'binding', 'model', 'name', 'linkText', 'partialLinkText', 'tagName', 'xpath' ];

		$http.get('steps/objects?feature='+vm.featureName).then(function(res) {
			vm.pageObjects=res.data;
		},function(){
			console.log(1);
			vm.pageObjects=[]
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
			$http.post('steps/objects?feature='+vm.featureName, {
				objects : vm.pageObjects
			}).then(function(res) {

			})
		}

		$scope.$on('modal.closing', function() {
			vm.saveObjects();
		})
	}
}());
