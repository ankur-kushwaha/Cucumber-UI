var utils = require('./helper/utils');

module.exports = function() {
 
  this.Then('I should see "$elem"', function(elem) {
    return utils.findElement(arg1);
  });

  this.Then('I should not see "$elem"', function(elem) {
    var elements=utils.findElements(elem);
    if(elements.count()==0){
    	return 
    }else{
    	return new Error(elem+' Element found on page');
    }
  });

  

  this.Then('I should see the alert "$alertText"', function(alertText, callback) {
    return driver.wait(function() {
      return driver.executeScript('return !!$(".alert").length;');
    }, 10000).then(function() {
      return browser.findElement(by.xpath('//*[text()="' + arg1 + '"]'));
    }).then(function() {
      // clean up alert
      return driver.executeScript('$(".alert").remove();');
    }).then(function() {
      callback();
    }, function(e) {
      callback.fail(e.message);
      //callback.fail('alert with text "' + arg1 + '" not found');
    });
  });

 

  

  /**
   * Spec: ".some-element-class" should have text "Some text"
   *
   * @params {string} arg1 CSS selector
   * @params {string} arg2 Text to match
   */
  this.Then('"$elem" should have text "$text"', function(elem,text, callback) {
    utils.findElement(elem).then(function(el) {
      return el.getText();
    }).then(function(text) {
      assert.equal(text, text);
    }).then(callback);
  });


  /**
   * Step: Then the "Name" input should equal "My Name"
   *
   * @params {string} arg1 The input selector [id, css selector, or label]
   * @params {string} arg2 The text to match
   */
  this.Then('the "$elem" input should equal "$text"', function(elem,text, callback) {
    utils.findInput(elem).then(function(input) {
      return input.getAttribute('value');
    }).then(function(value) {
      assert.equal(value, text);
    }).then(callback);
  });

};
