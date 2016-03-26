(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:RightAsideCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('RightAsideCtrl', RightAsideCtrl);

  function RightAsideCtrl($http,$scope,featureName) {
    var vm = this;
    vm.ctrlName = 'RightAsideCtrl';
    
    vm.featureName=featureName;
    
    vm.types=['css','id','name','linkText'];
    
    $http.get('steps/objects',{
    }).then(function(res){
    	
    	var objects=res.data;
    	objects.global = Object.keys(objects.global).map(function(k){return objects.global[k]});
    	objects[featureName] = Object.keys(objects[vm.featureName]).map(function(k){return objects[vm.featureName][k]});
    	vm.objects=objects;
    })
    
    vm.addNewObject=function(objectType){
    	console.log(objectType);
    	vm.objects[objectType]=vm.objects[objectType]||[]
    	vm.objects[objectType].push({
    		type:'css'
    	})
    }
    
    vm.saveObjects=function(){
    	var objects={};
    	objects.global={}
    	objects[vm.featureName]={};
    	vm.objects.global.forEach(function(obj){
    		objects.global[obj.name]=obj;
    	})
    	vm.objects[vm.featureName].forEach(function(obj){
    		objects[vm.featureName][obj.name]=obj;
    	})
    	
    	
    	$http.post('steps/objects',{
    		objects:objects
    	}).then(function(res){
    		
    	})
    }
    
    $scope.$on('modal.closing',function(){
    	console.log('closing')
    	vm.saveObjects();
    })
  }
}());
