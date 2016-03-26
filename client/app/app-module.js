(function () {
  'use strict';

  /* @ngdoc object
   * @name polyAppSample
   * @description
   *
   */ 
  angular  
    .module('polyAppSample', [
      'ui.router',
      'ui.bootstrap',
      'dndLists', 
      'ngSanitize',
      'xeditable',
      'ngAside',
      'home',
      'common'
    ])
    
    .run(function(editableOptions) {
    	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    	});
}());
