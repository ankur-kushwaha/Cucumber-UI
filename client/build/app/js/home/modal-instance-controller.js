(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:ModalInstanceCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  function ModalInstanceCtrl($scope, $uibModalInstance) {
    var vm = this;
    vm.ctrlName = 'ModalInstanceCtrl';
    
    $scope.ok = function () {
      $uibModalInstance.close($scope.feature.name);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());

//# sourceMappingURL=modal-instance-controller.js.map
