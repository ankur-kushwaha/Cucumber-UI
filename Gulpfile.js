'use strict';

var $, gulp = require('gulp'), config = require('./test-config');
var protractorReport = require('gulp-protractor-cucumber-html-report');

$ = require('gulp-load-plugins')({
	pattern : [ 'gulp-*' ]
});

// run e2e tests - SERVER MUST BE RUNNING FIRST
gulp.task('e2eTest', function() {
	return gulp.src('e2e/features/*.feature').pipe($.protractor.protractor({
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
