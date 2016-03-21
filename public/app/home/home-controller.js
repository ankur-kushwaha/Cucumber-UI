(function() {
	'use strict';

	/**
	 * @ngdoc object
	 * @name home.controller:HomeCtrl
	 * 
	 * @description
	 * 
	 */
	angular.module('home').controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($http,$compile, $aside) {
		var vm = this;
		vm.ctrlName = 'HomeCtrl';

		vm.openLeftSlider = function() {
			var asideInstance = $aside.open({
				templateUrl : 'home/aside.tpl.html',
				controller : 'AsideCtrl',
				placement : 'left',
				size : 'sm'
			});
		}


		$http.get('/steps').then(function(res) {
			vm.steps = res.data;
		})

		vm.feature = {
			name : 'Feature Name',
			description : 'Feature Description',
			scenarios : [ {
				name : 'Scenarion Name',
				steps : []
			} ]
		}

		vm.addMoreScenario = function() {
			vm.feature.scenarios.push({
				name : '',
				steps : []
			})
		}

		vm.upload = function(feature) {
			$http.post('/steps/export', {
				feature : feature
			}).then(function(res) {
				console.log(res.data)
			})
		}
	}
}());
