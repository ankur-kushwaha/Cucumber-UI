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

	function HomeCtrl($http,$compile, $aside,$uibModal,$log) {
		var vm = this;
		vm.ctrlName = 'HomeCtrl';

		this.toggleModal = function(){
	        this.showModal = !this.showModal;
	    };
		
		vm.addNewFeature=function(){
			var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'myModalContent.html',
			      controller: 'ModalInstanceCtrl',
			      size: 'sm'
			    });

			    modalInstance.result.then(function (name) {
			      console.log(name)
			      vm.features[name]={
			  			name : name,
						description : 'Feature Description',
						scenarios : [ {
							name : 'Scenarion Name',
							steps : []
						} ]
				  }
			      
			      vm.feature=vm.features[name];
			      
			      vm.upload(vm.feature);
			      
			    }, function () {
			      $log.info('Modal dismissed at: ' + new Date());
			    });
		}
		
		vm.openLeftSlider = function() {
			var asideInstance = $aside.open({
				templateUrl : 'home/aside.tpl.html',
				controller : 'AsideCtrl',
				placement : 'left',
				size : 'sm'
			});
		}


		$http.get('/steps').then(function(res) {
			vm.steps = res.data.steps;
			vm.features=res.data.features;
			vm.feature=vm.features[Object.keys(vm.features)[0]];
		})


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
		
		vm.deleteFeature=function(feature){
			console.log(feature);
			$http.delete('/steps/export', {
				params:{
					name:feature.name
				}
			}).then(function(res) {
				delete vm.features[feature.name];
				if(vm.feature.name=feature.name){
					vm.feature=vm.features[Object.keys(vm.features)[0]];
				}
			})
		}
	}
}());
