// features/support/world.js
var path = require('path');
var jsonfile = require('jsonfile');
var _=require('lodash');

function World() {
	var runConfigFile = path.join(process.cwd()+'/run-config.json');
	var runConfig = jsonfile.readFileSync(runConfigFile);
	var feature = runConfig.feature;
	
	var page;

	function toObject(arr) {
		  var rv = {};
		  for (var i = 0; i < arr.length; ++i){
			  rv[arr[i].name.toLowerCase()] = arr[i];
		  }
		  return rv;
	}

	var poFile = path.join(process.cwd(),'features/'+runConfig.feature.replace(" ","_").toLowerCase()+'.json');
	var po = jsonfile.readFileSync(poFile);
	
	po.forEach(function(pageObject){
		pageObject.objects=toObject(pageObject.objects);
	});
	po=toObject(po);

	this.setPage = function(page) {
		this.page = page;
	};

	this.findElement = function(button, type) {
		button=button.toLowerCase();
		if (type) {
			return element(by[type](button));
		}
		var obj;
		if(this.page){
			obj = po[this.page.toLowerCase()].objects[button];
		}
		if (!obj) {
			obj = po.global.objects[button];
		}

		if (!obj) {
			console.log(button + ' object not found in repository');
		} else {
			return element(by[obj.type](obj.value));
		}
	};
	this.findElements = function(button, type) {

		if (type) {
			return element.all(by[type](button));
		}

		var obj = po[feature][button];
		if (!obj) {
			obj = po.global[button];
		}
		if (!obj) {
			console.log('object not found in repository');
			return new Error('object not found in repository');
		} else {
			return element.all(by[obj.type](obj.value));
		}
	};

}

module.exports = function(){
	this.World=World;
}
