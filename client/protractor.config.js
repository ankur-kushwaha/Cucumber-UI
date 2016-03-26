var glob = require('glob')
  , buildConfigFile = require('find-up').sync('build.config.js')
  , buildConfig = require(buildConfigFile);

exports.config = {
  framework: 'jasmine2',
  baseUrl: 'http://' + buildConfig.host + ':' + buildConfig.port,
  seleniumServerJar: glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar').join(),
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
	print: function() {}
  },
  onPrepare: function() {
        	var jasmineReporters = require('jasmine-reporters');
        	jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            	consolidateAll: true,
            	savePath: buildConfig.junitDir,
            	filePrefix: 'e2e-test'
        	}));
			
			  var SpecReporter = require('jasmine-spec-reporter');
			  // add jasmine spec reporter
			  jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    	}
};
