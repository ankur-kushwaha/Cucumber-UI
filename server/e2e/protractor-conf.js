var glob = require('glob')
var runConfig = require('jsonfile').readFileSync('./run-config.json'),config=require('./config.js');

exports.config = { 

  //specs: [    'e2e/features/*.feature'  ],

  capabilities: config.capabilities[runConfig.browser],

  //baseUrl: 'http://localhost:8081/',
  seleniumServerJar : glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar').join(),
	
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  allScriptsTimeout: 500000,
  onPrepare:function(){
	  if(runConfig.baseUrl.length!=0){
	  browser.driver.get(runConfig.baseUrl);

		browser.driver.findElement(by.id('pgLogin:navbar:txtUserName')).sendKeys(runConfig.userName);
		browser.driver.findElement(by.id('pgLogin:navbar:txtPassword')).sendKeys(runConfig.password);
		browser.driver.findElement(by.css('.go')).click();

		// Login takes some time, so wait until it's done.
		// For the test app's login, we know it's done when it redirects to
		// index.html.
		browser.driver.wait(function() {
			return browser.driver.getCurrentUrl().then(function(url) {
				return /dashboard/.test(url);
			});
		});
	  }
  },
  cucumberOpts: {
	  require: 'features/**/*.js',
	   // tags: '@dev',
	   // format: undefined,
	   // profile: false,
	    //'no-source': true
	  name:runConfig.scenarioName
	  }
};
