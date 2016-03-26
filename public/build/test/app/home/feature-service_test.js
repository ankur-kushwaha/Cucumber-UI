/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Feature', function () {
  var service;

  beforeEach(module('home'));

  beforeEach(inject(function (Feature) {
    service = Feature;
  }));

  it('should equal Feature', function () {
    expect(service.get()).toEqual('Feature');
  });
});
