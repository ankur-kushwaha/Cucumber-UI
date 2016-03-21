var fs = require('fs');
var glob = require('glob');
var path = require('path');
var jsonfile = require('jsonfile')

var express = require('express');
var cmd=require('node-cmd');

var router = express.Router();
var file = "data/features.json";

var features = jsonfile.readFileSync(file);

/* GET users listing. */
router.get('/', function(req, res, next) {
	// res.send('respond with a resource');
	res.json({
		steps : getSteps(),
		features : features
	})
});

router.post('/export', function(req, res, next) {
	// console.dir(req);
	var feature = req.body.feature;
	// console.log(data);
	writeFile(feature);
	features[feature.name] = feature;
	jsonfile.writeFileSync(file, features, {
		spaces : 2
	})
	res.json(feature);
})

router.get('/run',function(req,res,next){
	var parentDir = path.resolve(process.cwd(), '..');
	console.log(parentDir);
	execute("gulp --cwd="+parentDir, function(stdout){
		console.log(stdout);
		res.send(stdout);
	})
})

var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

router.delete('/export',function(req,res,next){
	var featureName=req.query.name;
	delete features[featureName];
	jsonfile.writeFileSync(file, features, {
		spaces : 2
	})
	res.json(featureName);
});

function writeFile(feature) {
	var data = 'Feature: ' + feature.name + "\n";
	data = data + feature.description + "\n\n";
	feature.scenarios.forEach(function(scenario) {
		data = data + 'Scenario: ' + scenario.name + "\n"
		scenario.steps.forEach(function(line) {
			data = data + line.desc + "\n";
		})
		data += "\n";
	});
	fs.writeFile("../e2e/features/" + feature.name.replace(/ /g, '_') + ".feature", data, function(err) {
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
			stepsArray.push({
				desc : type + ' ' + regExp.toString()
			});
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

	var files = glob.sync('../e2e/features/steps/*.js');
	console.log(files);

	files.forEach(function(file) {
		console.log(file);
		require(path.resolve(file)).apply(container);
	})
	return stepsArray;
}

module.exports = router;
