// features/support/world.js
var path=require('path');
var jsonfile=require('jsonfile');
var poFile=path.join(__dirname,'../po.json');
var po=jsonfile.readFileSync(poFile);

var runConfigFile=path.join(__dirname, '../../../run-config.json')
var runConfig=jsonfile.readFileSync(runConfigFile);
var feature=runConfig.feature;


function World() {

	this.findElement=function(button,type){
		
		if(type){
			return element(by[type](button));
		}
		
		var obj=po[feature][button]
		 if(!obj){
			 obj=po.global[button]
		 }
		if(!obj){
			 console.log('object not found in repository');
			 return new Error('object not found in repository');
		 }else{
			 return element(by[obj.type](obj.value));
		 }
	}
	this.findElements=function(button,type){
		
		if(type){
			return element.all(by[type](button));
		}
		
		var obj=po[feature][button]
		 if(!obj){
			 obj=po.global[button]
		 }
		if(!obj){
			 console.log('object not found in repository');
			 return new Error('object not found in repository');
		 }else{
			 return element.all(by[obj.type](obj.value));
		 }
	}
  
}

module.exports = new World();