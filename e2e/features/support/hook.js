var outputDir = 'report/';
var Cucumber=require('cucumber');
var fs=require('fs');
var myAfterHooks = function () {
	

this.After(function(scenario, callback) {
  if (scenario.isFailed()) {
    browser.takeScreenshot().then(function(base64png) {
      var decodedImage = new Buffer(base64png, 'base64').toString('binary');
      scenario.attach(decodedImage, 'image/png');
      callback();
    }, function(err) {
      callback(err);
    });
  } else {
    callback();
  }
});

var createHtmlReport = function(sourceJson) {
  var CucumberHtmlReport = require('cucumber-html-report');
  var report = new CucumberHtmlReport({
    source: sourceJson, // source json
    dest: outputDir // target directory (will create if not exists)
  });
  report.createReport();
};

var JsonFormatter = Cucumber.Listener.JsonFormatter();
JsonFormatter.log = function(string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  var targetJson = outputDir + 'cucumber_report.json';
  fs.writeFile(targetJson, string, function(err) {
    if (err) {
      console.log('Failed to save cucumber test results to json file.');
      console.log(err);
    } else {
      createHtmlReport(targetJson);
    }
  });
};

this.registerListener(JsonFormatter);
}

module.exports = myAfterHooks;