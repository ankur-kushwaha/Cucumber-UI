var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
var jsonfile = require('jsonfile');
var path = require('path');

module.exports = function() {
	this.Given('I go on "$url"', {
		timeout : 600000
	}, function(url) {
		// Write code here that turns the phrase above into concrete actions
		// browser.ignoreSynchronization = true;
		return browser.get(url);
		// callback()
	});

	this.Given('I go on non-angular "$url"', {
		timeout : 600000
	}, function(url) {
		// Write code here that turns the phrase above into concrete actions
		browser.ignoreSynchronization = true;
		return browser.get(url);
		// callback()
	});

	this.Then('the title should equal "$title"', function(title) {
		// Write code here that turns the phrase above into concrete actions
		return expect(browser.getTitle()).to.eventually.equal(title);
	});

	this.Given('the user moved to "$page"', function(page) {
		return this.setPage(page);
		//this.findElement("Develop").click();
		//return this.findElement(page).click();

	});

};
