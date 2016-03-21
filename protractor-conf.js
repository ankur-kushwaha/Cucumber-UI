var glob = require('glob')
exports.config = {

  specs: [    'e2e/features/*.feature'  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8081/',
  seleniumServerJar : glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar').join(),
	
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  

  cucumberOpts: {
	   require: 'e2e/**/*.js',
	   // tags: '@dev',
	   // format: undefined,
	   // profile: false,
	    //'no-source': true
	  }

};
