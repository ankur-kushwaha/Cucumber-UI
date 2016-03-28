var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
var jsonfile = require('jsonfile')
var path=require('path')
var poFile=path.join(__dirname, 'po.json')
var po=jsonfile.readFileSync(poFile);
var runConfigFile=path.join(__dirname, '../../run-config.json')
var runConfig=jsonfile.readFileSync(runConfigFile);
var feature=runConfig.feature;

module.exports = function() {
  this.Given('I go on "$url"',{timeout:600000}, function (url) {
    // Write code here that turns the phrase above into concrete actions
	  //browser.ignoreSynchronization = true;
	  return browser.get(url);
    //callback()
  });

  this.Then('the title should equal "$title"', function (title) {
    // Write code here that turns the phrase above into concrete actions
	 return  expect(browser.getTitle()).to.eventually.equal(title);
  });
  
  
}