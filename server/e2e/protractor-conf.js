var glob = require('glob')
var runConfig = require('jsonfile').readFileSync('./run-config.json'),config=require('./config.js');

exports.config = { 

  //specs: [    'e2e/features/*.feature'  ],

  capabilities: config.capabilities[runConfig.browser],

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
