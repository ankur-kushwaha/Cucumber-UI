/* global describe, beforeEach, it, browser, expect */
'use strict';

var DirectivesPagePo = require('./directives.po');

describe('Directives page', function () {
  var directivesPage;

  beforeEach(function () {
    directivesPage = new DirectivesPagePo();
    browser.get('/#/directives');
  });

  it('should say DirectivesCtrl', function () {
    expect(directivesPage.heading.getText()).toEqual('directives');
    expect(directivesPage.text.getText()).toEqual('DirectivesCtrl');
  });
});
