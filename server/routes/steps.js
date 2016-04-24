var fs = require('fs');
var glob = require('glob');
var path = require('path');
var jsonfile = require('jsonfile') 
var exec = require('child_process').exec;
var spawn= require('child_process').spawn;
var express = require('express');  
var cmd=require('node-cmd'); 
  
var router = express.Router();  

var file = "data/features.json";
var runConfigFile='e2e/run-config.json';
var poFile="e2e/features/steps/po.json";

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

router.delete('/export',function(req,res,next){
	var featureName=req.query.name;
	delete features[featureName];
	jsonfile.writeFileSync(file, features, {
		spaces : 2
	})
	res.json(featureName);
});
 
router.get('/run',function(req,res,next){
	
	var runConfig=jsonfile.readFileSync(runConfigFile);
	var browser=req.query.browser;
	var feature=req.query.feature;
	var scenarioName=req.query.scenarioName;
	
	var specs='features/'+feature.replace(/ /g, '_')+'.feature';
	
	runConfig.browser=browser||runConfig.browser;
	runConfig.specs=specs||runConfig.specs;
	runConfig.feature=feature||runConfig.feature;
	runConfig.scenarioName=scenarioName||'';
	 
	// console.log(runConfig);
	
	jsonfile.writeFile(runConfigFile, runConfig,{
		spaces:2
	},function (err) {
		console.error(err)
	})
	
	
	//execute("gulp --cwd=e2e", function(stdout){console.log(stdout);res.redirect('/e2e')});
	var io=req.io;
	var ls    =
    	spawn('cmd', ['/s', '/c', '"gulp --cwd=e2e"'], { 
    		  windowsVerbatimArguments: true
    		});    	
    	
	ls.stdout.on('data', function (data) {    // register one or more handlers
	  console.log('stdout: ' + data);
	  io.emit('message', { message: ""+data });
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	ls.on('exit', function (code) {
	  console.log('child process exited with code ' + code);
	  io.emit('exit');
	  res.sendStatus(code)
	});
	
})

router.get('/objects',function(req,res){
	var feature=req.query.feature;
	var poFile="e2e/features/"+feature+".json";
	var po = jsonfile.readFileSync(poFile);
	res.json(po);
})

router.post('/objects',function(req,res){
	var feature=req.query.feature;
	var poFile="e2e/features/"+feature+".json";
	
	var objects=req.body.objects;
	jsonfile.writeFile(poFile, objects,{
		spaces:2
	},function (err) {
		console.error(err)
	})
	res.json(objects);
})

router.get('/test',function(req,res){

	var io=req.io;
	
    var ls    =
    	spawn('cmd', ['/s', '/c', '"gulp --gulpfile=e2e/Gulpfile.js"'], { 
    		  windowsVerbatimArguments: true
    		});    	
    	
	ls.stdout.on('data', function (data) {    // register one or more handlers
	  console.log('stdout: ' + data);
	  io.emit('message', { message: ""+data });
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	ls.on('exit', function (code) {
	  console.log('child process exited with code ' + code);
	  res.redirect('/e2e');
	});
});

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};


function writeFile(feature) {
	var data = 'Feature: ' + feature.name + "\n";
	data = data + feature.description + "\n\n";
	feature.scenarios.forEach(function(scenario) {
		data = data + 'Scenario: ' + scenario.name + "\n"
		scenario.steps.forEach(function(line) {
			data = data + line.type+" "+line.step + "\n";
		})
		data += "\n";
	});
	fs.writeFile("e2e/features/" + feature.name.replace(/ /g, '_') + ".feature", data, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}

function getSteps() {
	var stepsArray = [];
	var fileName='';
	var container = {
		myFn : function(type, regExp, fn) {
			// console.log(type + ' ' + regExp.toString());
			stepsArray.push({
				fileName:fileName,
				type:type,
				step:regExp.toString()
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
	var files = glob.sync('e2e/features/steps/*.js');
	files.forEach(function(file) {
		 fileName=file.replace('e2e/features/steps/','').replace('.js','').toUpperCase();
		
		require(path.resolve(file)).apply(container);
	})
	return stepsArray;
}

module.exports = router;
