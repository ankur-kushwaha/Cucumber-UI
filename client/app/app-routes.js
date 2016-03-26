(function () {
  'use strict';

  angular
    .module('polyAppSample')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
