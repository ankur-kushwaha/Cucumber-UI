/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RightAsideCtrl', function () {
  var ctrl;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RightAsideCtrl');
  }));

  it('should have ctrlName as RightAsideCtrl', function () {
    expect(ctrl.ctrlName).toEqual('RightAsideCtrl');
  });
});
