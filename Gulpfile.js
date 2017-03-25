'use strict'; 

var $, gulp = require('gulp');

var runConfig = require('jsonfile').readFileSync('./run-config.json'),config=require('./config.js');

var protractorReport = require('gulp-protractor-cucumber-html-report');
//var PropertiesReader = require('properties-reader');
//var properties = PropertiesReader('test.properties');

$ = require('gulp-load-plugins')({
	pattern : [ 'gulp-*' ]
});

// run e2e tests - SERVER MUST BE RUNNING FIRST
gulp.task('e2eTest', function() {
	return gulp.src(runConfig.specs).pipe($.protractor.protractor({
		configFile : 'protractor-conf.js'
	})).on('error', function(e) {
		console.log(e);
	});
});

gulp.task('htmlReport',['e2eTest'],function(){
	return gulp.src('./report.json')
    .pipe(protractorReport({
        dest: 'reports/'
    }));
})

gulp.task('webdriverUpdate', $.protractor.webdriver_update);

gulp.task('default', [ 'e2eTest','htmlReport' ]);
