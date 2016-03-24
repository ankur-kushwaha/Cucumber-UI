var glob = require('glob')
var config=require('./test-config.js')
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('test.properties');

exports.config = {

  //specs: [    'e2e/features/*.feature'  ],

  capabilities: config.capabilities[properties.get('browser')],

  //baseUrl: 'http://localhost:8081/',
  seleniumServerJar : glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar').join(),
	
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  

  cucumberOpts: {
	  require: 'features/**/*.js',
	   // tags: '@dev',
	   // format: undefined,
	   // profile: false,
	    //'no-source': true
	  }

};
