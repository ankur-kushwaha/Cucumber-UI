/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Socket', function () {
  var factory;

  beforeEach(module('home'));

  beforeEach(inject(function (Socket) {
    factory = Socket;
  }));

  it('should have someValue be Socket', function () {
    expect(factory.someValue).toEqual('Socket');
  });

  it('should have someMethod return Socket', function () {
    expect(factory.someMethod()).toEqual('Socket');
  });
});
