var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
var jsonfile = require('jsonfile')
var path=require('path')
var poFile=path.join(__dirname, 'po.json')
var runConfigFile=path.join(__dirname, '../../run-config.json')
var po=jsonfile.readFileSync(poFile);
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
	 console.log(browser.getT)
	 return  expect(browser.getTitle()).to.eventually.equal(title);
  });
  
  this.Then('User clicks on "$button"',function(button){
	 var obj=po[feature][button]
	 if(!obj){
		 obj=po.global[button]
	 }
	 if(!obj){
		 console.log('object not found in repository');
	 }else{
		 element(by[obj.type](obj.value)).click();
	 }
	  //element(by.css('[href="#/catalog/all"]')).click();
	  //element(by[po[feature].type](po[feature].value))
  })
}