/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AsideCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AsideCtrl');
  }));

  it('should have ctrlName as AsideCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AsideCtrl');
  });
});
