/* global describe, beforeEach, it, browser, expect */
'use strict';

var CommonPagePo = require('./common.po');

describe('Common page', function () {
  var commonPage;

  beforeEach(function () {
    commonPage = new CommonPagePo();
    browser.get('/#/common');
  });

  it('should say CommonCtrl', function () {
    expect(commonPage.heading.getText()).toEqual('common');
    expect(commonPage.text.getText()).toEqual('CommonCtrl');
  });
});
