'use strict';

angular.module('mtgCentral')

  .factory('SearchSvc', function($q, $http){
    function SearchSvc() {}
    SearchSvc.prototype.searchByName = function(searchString) {
      // TODO: Figure out the best way to add a delay
       return $http.get("http://api.mtgdb.info/search/" + searchString);
      };
      return (SearchSvc);
    })


  .controller('SearchCtrl', ['SearchSvc', 'FirebaseUrl', '$scope',
  function(SearchSvc, FirebaseUrl, $scope){
    var self = this;

    var searchSvc = new SearchSvc();

    this.wantIds = {};
    this.haveIds = {};

    this.wants = [];
    this.haves = [];

    this.searchByName = function(){
      self.cards = [];
      if ($scope.searchForm.length >= 3) {
        searchSvc.searchByName($scope.searchForm).success(function(data){
            self.cards = data;
          });
       }
    };

    this.addItem = function(index){
      var list;
      // See what check box has been checked
      if ($('#haveCheck').prop('checked')){
        list = self.haves;
      } else {
        list = self.wants;
      }
      if(list.length === 0){
        list.push(self.cards[index]);
        if (list === self.wants){
          self.wantIds[self.cards[index].id] = {id:self.cards[index].id, qty:1, name:self.cards[index].name , cardSetName:self.cards[index].cardSetName} ;
        } else {
          self.haveIds[self.cards[index].id] = {id:self.cards[index].id, qty:1, name:self.cards[index].name , cardSetName:self.cards[index].cardSetName} ;
        }
      }else{
        var duplicate = false;
        list.some(function(value){
          var tempId = self.cards[index].id;
          if(value.id === tempId){
            duplicate = true;
          }
        });
        if(duplicate === false){
          list.push(self.cards[index]);
          if (list === self.wants){
            self.wantIds[self.cards[index].id] = {id:self.cards[index].id, qty:1, name:self.cards[index].name , cardSetName:self.cards[index].cardSetName} ;

          } else {
            self.haveIds[self.cards[index].id] = {id:self.cards[index].id, qty:1, name:self.cards[index].name , cardSetName:self.cards[index].cardSetName} ;
          }
        }
      }
    };


    this.removeItemHave = function(index){
      for(var i = 0; i < self.haves.length; i++){
        if (self.haves[i].id == index){
          self.haves.splice(i,1);
          delete self.haveIds[index];
        }
      }

    };

    this.removeItemWant = function(index){
      for(var i = 0; i < self.wants.length; i++){
        if(self.wants[i].id == index){
          self.wants.splice(i,1);
          delete self.wantIds[index];
        }
      }
    };

    this.pushCards = function(id){
      var user = FirebaseUrl.child('users').child(id);

      // Update the authdUser's information in Firebase
      console.log(self.wantIds);
      user.update({
        wants: self.wantIds,
        haves: self.haveIds
      });
    };
}]);
