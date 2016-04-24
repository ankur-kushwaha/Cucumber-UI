Feature: test
Feature Description

Scenario: Scenario Name
Given I go on "http://localhost:3000/#/register/detail/bank"
Given the user moved to "BankDetails"
Then I fill in "name" with "test"
Then "submit" should be disabled
Then I fill in "accountNumber" with "1234"
Then I fill in "confirmAccountNumber" with "1234"
Then I fill in "ifscCode" with "AFDFD34434"
Then User clicks on "acceptCheckbox"
Then User clicks on "ifscmodal"
Given I select "BANK 0" from "bankSelect"
Given I select "CITY 0" from "citySelect"
Given I select "Branch 0" from "branchSelect"
Then User clicks on "ifscCodeCheckbox"
Then "ok" should be enabled
Then User clicks on "ok"
Then "submit" should be enabled

