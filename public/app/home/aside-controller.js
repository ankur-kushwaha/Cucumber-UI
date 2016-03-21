(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:AsideCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('AsideCtrl', AsideCtrl);

  function AsideCtrl() {
    var vm = this;
    vm.ctrlName = 'AsideCtrl';
  }
}());
