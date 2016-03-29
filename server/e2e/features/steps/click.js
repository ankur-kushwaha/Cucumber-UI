var utils = require('./helper/utils');

/*
 * click.js
 * 
 * Provides step definitions for click behaviour
 * 
 * @author Joris de Wit <joris.w.dewit@gmail.com>
 */
module.exports = function() {

	/**
	 * Press a button with specified text
	 * 
	 * Usage: Given I press "Submit"
	 * 
	 * @params {string} arg1 The specified button text
	 */
	this.Then('User clicks on link with text "$text"', function(text) {
		return utils.findElement(text, 'linkText').click();
	});

	/**
	 * Click on an element with by id, class, or link text
	 * 
	 * Usage: Given I click on "#someButton" Usage: Given I click on
	 * ".some-button" Usage: Given I click on "Hey Man"
	 * 
	 * @param {string}
	 *            arg1 The text to match
	 */
	this.Then('User clicks on "$elem"', function(elem) {
		return utils.findElement(elem).click()
	});

};
