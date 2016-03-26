'use strict';

var outDir = 'report';
var testsDir = 'e2e';

module.exports = {
	junitDir : outDir + '/junit',
	e2eFiles : testsDir + "/**/*_test.js",
	baseUrl : 'http://seller.snapdeal.com',
	capabilities:{
		chrome:{
		    'browserName': 'chrome'
		  },
		  phantomjs:{
			  'browserName': 'phantomjs',
			  'phantomjs.binary.path': require('phantomjs').path,
			  'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
		  }
	}
}