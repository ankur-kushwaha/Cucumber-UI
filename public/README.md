# polyAppModuleType

*Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.11.3) version 0.11.3*

## Setup
1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly@0.11.3`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm install` to install this project's dependencies
1. Run `bower install` to install client-side dependencies
1. Use [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly) to create additional components

## Gulp tasks
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
 - **A localhost must be running** - `gulp dev`

## Add junitXmlReport to protractor
    
    1. First add jasmine-reporters to project.
     	npm install -D jasmine-reporters

    3. Add below code to export.config in protractor.config.js
    	framework: 'jasmine2',
	
	2. Add the snippet to protractor.config.js

    	onPrepare: function() {
        	var jasmineReporters = require('jasmine-reporters');
        	jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            	consolidateAll: true,
            	savePath: buildConfig.junitDir,
            	filePrefix: 'e2e-test'
        	}));
    	}

##  Add coverage reports to your project
	1. add the following in exports.config in karma.config.js
	    coverageReporter:{
			type : 'html',
			dir : buildConfig.coverageReportDir
		  },

##  Add junit reporter to karma test(unit test)
    1. Add "junit" to the reporters
    
    3. npm install karma-junit-reporter --save-dev

    2. Add below code to export.config
       junitReporter : {
		outputDir:buildConfig.junitDir,
		outputFile: 'unit-test.xml'
	  }

## Update the anlysis report location path
    1. update the location in "$.plato.inspect" in gulp/analyze.js
        $.plato.inspect(matches, './report/code-analysis/', {}, function () {
            done(); 
        }); 

## Now, final report structure be like:
    
	build > Report
        - Code Analysis: This folder will contain the javascript analysis file by plato
        - Coverage: This folder will contains the coverage report
        - junit : This folder will contains the test junit report
            -- <browserName>/unit-test.xml : Contains the junit report for each browser  
            -- e2e-test.xml : Junit file for E2E test.
            
## Comment out eslint as it create unnecessary spacing error in code.
    Comment the below code from gulp/analyze.js at line 24. 
      //.pipe($.eslint({quiet:true}))
      //.pipe($.eslint.formatEach('./node_modules/eslint-path-formatter'))
      //.pipe($.eslint.failOnError())
	  
	  
## Use jasmine-spec-reporter with Protractor
	First	
		npm install -D jasmine-spec-reporter
	
	In your Protractor configuration file:

		exports.config = {
		   // your config here ...

		   onPrepare: function() {
			  var SpecReporter = require('jasmine-spec-reporter');
			  // add jasmine spec reporter
			  jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
		   }
		}
		
	Remove protractor dot reporter
		In your protractor configuration file, add the print function in the `jasmineNodeOpts` section:

		jasmineNodeOpts: {
		   ...
		   print: function() {}
		}
	
