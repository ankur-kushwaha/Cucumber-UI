

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;


module.exports = function() {
  this.Given("I submit the form", function() {
    return driver.findElement(by.css('button[type="submit"]')).click();
  });

  /**
   * Fill in a text input or textarea with some text
   * @param string Matches either the inputs name attribute or its label text
   * @param string The text to input
   */
  this.Then('I fill in "$inputbox" with "$value"', function(inputbox,value) {
    return this.findElement(inputbox).clear().sendKeys(value)//.sendKeys(protractor.Key.TAB);
  });



  /**
   * Select an option of a select element
   *
   * Step: Given I select "Some option text" from ".some-select-input"
   *
   * @params {string} arg1 The options text
   * @params {string} arg2 The selector [id, css selectors, label text]
   */
  this.Given('I select "$option" from "$select"', function(option,select) {
	  //console.log(this.findElement(select));
	  return this.findElement(select).$('[label="'+option+'"]').click();
  });


  this.Given('I check "$checkbox"', function(checkbox) {
	  return this.findElement(checkbox).click();
  });
  
  this.Then('"$input" should be disabled', function(input) {
	  return expect(this.findElement(input).getAttribute('disabled')).to.eventually.equal('true');
  });
  this.Then('"$input" should be enabled', function(input) {
	  console.log(this.findElement(input));
	  return expect(this.findElement(input).getAttribute('disabled')).to.eventually.equal(null);
  });

};
