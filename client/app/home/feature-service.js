(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name home.service:Feature
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('Feature', Feature);

  function Feature() {
    var self = this;

    self.get = function () {
      return 'Feature';
    };
  }
}());
