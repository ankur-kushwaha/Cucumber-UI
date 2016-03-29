Feature: Feature Name
Testing angularjs websites

Scenario: Guide testing
Given I go on "http://angularjs.org"
Given the user moved to "Guide"
Then the title should equal "AngularJS: Developer Guide: Developer Guide"

Scenario: Tutorial Testing
Given I go on "http://angularjs.org"
Given the user moved to "Tutorial"
Then the title should equal "AngularJS: Tutorial: Tutorial"

