'use strict';

var outDir = 'report';
var testsDir = 'e2e';

module.exports = {
	junitDir : outDir + '/junit',
	e2eFiles : testsDir + "/**/*_test.js",
	baseUrl : 'http://seller.snapdeal.com'
}