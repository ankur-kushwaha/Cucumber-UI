'use strict';

var path = require('path');
var outDir = 'build/';
var outAppDir = path.join(__dirname, "..", "server/static/");
var reportDir = outDir + "report/";

module.exports = {
  host: 'localhost',
  port: 3000,

  // app directories
  appDir: 'app',

  // unit test directories
  unitTestDir: 'app',

  // build test dir
  buildTestDir: outDir + 'test/',

  // build directories

  buildDir: outAppDir,
  buildCss: outAppDir + 'css/',
  buildFonts: outAppDir + 'fonts/',
  buildImages: outAppDir + 'images/',
  buildJs: outAppDir + 'js/',
  extDir: outAppDir + 'vendor/',
  extCss: outAppDir + 'vendor/css/',
  extFonts: outAppDir + 'vendor/fonts/',
  extJs: outAppDir + 'vendor/js/',

  //Report directories
  coverageReportDir: reportDir + 'coverage/',
  analysisReportDir: reportDir + 'analysis/',
  junitDir: reportDir + 'junit/'
};
