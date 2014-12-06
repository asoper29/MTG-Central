'use strict';

angular.module('mtgCentral')

.factory('cards', ['$firebase', function($firebase){
  var ref = new Firebase('https://mtg-central.firebaseio.com/cards')
  .limitToFirst(500);
  return $firebase(ref).$asArray();
}])

.controller('SearchCtrl', ['cards', function(cards){
    var self = this;

    this.sets = cards;
    this.haves = [];

    this.addItem = function(){
      console.log('The Card Name is ' + this[name] );
      // self.haves.push($(this).text());
    };
}]);
