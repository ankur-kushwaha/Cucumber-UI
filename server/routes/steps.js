var fs = require('fs');
var glob = require('glob');
var path = require('path');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// res.send('respond with a resource');
	res.json(getSteps());
});

router.post('/export', function(req, res, next) {
	// console.dir(req);
	var feature = req.body.feature;
	// console.log(data);
	writeFile(feature);
	res.json(feature);
})
var count = 0;
function writeFile(feature) {

	var data = 'Feature: ' + feature.name + "\n";
	data=data+feature.description+"\n\n";
	
	feature.scenarios.forEach(function(scenario) {

		data = data + 'Scenario: ' + scenario.name + "\n"

		scenario.steps.forEach(function(line) {
			data = data + line.desc + "\n";
		})
		
		data+="\n";

	});

	fs.writeFile("e2e/features/" +feature.name.replace(/ /g,'_')+ ".feature", data, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}

function getSteps() {

	var stepsArray = [];

	var container = {
		myFn : function(type, regExp, fn) {
			console.log(type + ' ' + regExp.toString());
			stepsArray.push({desc:type + ' ' + regExp.toString()});
		},

		Given : function(regExp, fn) {
			this.myFn('Given', regExp, fn);
		},
		Then : function(regExp, fn) {
			this.myFn('Then', regExp, fn);
		},
		When : function(regExp, fn) {
			this.myFn('When', regExp, fn);
		}
	};

	var files = glob.sync('e2e/features/*Steps.js');
	console.log(files);

	files.forEach(function(file) {
		console.log(file);
		require(path.resolve(file)).apply(container);
	})

	// var steps = require('../e2e/features/sampleSteps');

	return stepsArray;
}
module.exports = router;
