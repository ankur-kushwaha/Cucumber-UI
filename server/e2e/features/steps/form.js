var utils = require('./helper/utils');

var select = function(arg1, arg2, index, callback) {
  return utils.findInput(arg2, index).then(function(select) {
    return select.findElement(by.xpath('//option[text()="'+ arg1 +'"]'));
  }).then(function(option) {
    return option.click();
  }).then(callback);
};


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
    return utils.findElement(inputbox).clear().sendKeys(value).sendKeys(protractor.Key.TAB);
  });


  /**
   * Select an option of a select element
   *
   * Step: Given I select "Some option text" from ".some-select-input"
   *
   * @params {string} arg1 The options text
   * @params {string} arg2 The selector [id, css selectors, label text]
   */
  this.Given('I select "$option" from "$select"', function(option,selectBox) {
    select(option,selectBox);
  });


  this.Given('I check "$checkbox"', function(checkbox) {
	  return utils.findElement(checkbox).click();
  });

};
