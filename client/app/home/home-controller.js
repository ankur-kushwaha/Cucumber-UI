(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   * 
   * @description
   * 
   */
  angular.module('home').controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($http, $log, $window, Socket, toastr) {
    var vm = this;
    vm.ctrlName = 'HomeCtrl';
    vm.showLogPanel = false;

    this.toggleModal = function () {
      this.showModal = !this.showModal;
    };

    vm.addNewScenario = function () {
      var scenario = {
        name: 'Enter scenario name',
        steps: []
      };
      vm.feature.scenarios.push(scenario);
      vm.scenarioSelected = scenario;
      vm.upload(vm.feature);
    };

    vm.config = {
      browser: 'chrome'
    };


    vm.runFeature = function (featureName) {
      vm.upload(vm.feature).then(function () {
        vm.message = '';
        vm.showReport = false;
        vm.showLogsPanel = true;
        var browser = vm.config.browser;
        $http.get('/steps/run?browser=' + browser + '&feature=' + featureName);
      });
    };
    vm.runScenario = function (scenarioName) {
      vm.upload(vm.feature).then(function () {
        vm.message = '';
        vm.showReport = false;
        vm.showLogsPanel = true;
        var browser = vm.config.browser;
        $http.get('/steps/run?browser=' + browser + '&feature=' + vm.feature.name + '&scenarioName=' + scenarioName);
      });
    };

    Socket.on('message', function (data) {
      vm.message = vm.message + data.message;
    });
    Socket.on('exit', function () {
      vm.showReport = true;
    });

    vm.addNewFeature = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'md'
      });

      modalInstance.result.then(function (name) {

        vm.features[name] = {
          name: name,
          description: 'Feature Description',
          scenarios: [{
            name: 'Scenarion Name',
            steps: []
          }]
        };

        vm.feature = vm.features[name];

        vm.upload(vm.feature);

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.showConf = function () {
      $uibModal.open({
        templateUrl: 'home/right-aside.tpl.html',
        controllerAs: 'rightAside',
        controller: 'RightAsideCtrl',
        placement: 'right',
        size: 'md',
        resolve: {
          featureName: function () {
            return vm.feature.name;
          }
        }
      });
    };


    $http.get('/steps').then(function (res) {
      vm.steps = res.data.steps;
      vm.features = res.data.features;
      vm.feature = vm.features[Object.keys(vm.features)[0]];
      // vm.showConf()

    });

    vm.addMoreScenario = function () {
      var scenario = {
        name: 'Enter Scenario Name',
        steps: []
      };
      // vm.feature.scenarios.push(scenario);

      vm.scenarioSelected = scenario;
      vm.upload(vm.feature);
    };

    vm.upload = function (feature) {

      return $http.post('/steps/export', {
        feature: feature
      }).then(function () {

        toastr.success('Feature saved!');
      });
    };

    vm.deleteFeature = function (feature) {
      console.log(feature);
      $http.delete('/steps/export', {
        params: {
          name: feature.name
        }
      }).then(function () {
        delete vm.features[feature.name];
        if (vm.feature.name === feature.name) {
          vm.feature = vm.features[Object.keys(vm.features)[0]];
        }
      });
    };

    vm.deleteScenario = function (scenario) {
      var x = vm.feature.scenarios.indexOf(scenario);
      vm.feature.scenarios.splice(x, 1);
      vm.upload(vm.feature);
    };
  }
}());
