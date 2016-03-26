/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ModalInstanceCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ModalInstanceCtrl');
  }));

  it('should have ctrlName as ModalInstanceCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ModalInstanceCtrl');
  });
});
