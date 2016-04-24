Feature: Feature Name
Testing angularjs websites

Scenario: Guide testing
Given I go on "http://angularjs.org"
Given the user moved to "Guide"
Then the title should equal "AngularJS: Developer Guide: Developer Guide"

Scenario: Tutorial Testing
Given I go on non-angular "http://127.0.0.1:8080/index2.html"
Then I fill in "firstInputBox" with "test"
Then I fill in "secondTextBox" with "test2"

