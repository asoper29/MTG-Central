'use strict';

angular.module('mtgCentral')

  .factory('SearchSvc', function($q, $http){
    function SearchSvc() {}
    SearchSvc.prototype.searchByName = function(searchString) {
      // TODO: Figure out the best way to add a delay
      var deferred = $q.defer();

      $http.get("http://api.mtgdb.info/search/" + searchString).success(function(data){
        deferred.resolve(data);
      });

      return deferred.promise;

        //return $http.get("http://api.mtgdb.info/search/" + searchString);
    };
    return (SearchSvc);
  })


  .controller('SearchCtrl', ['SearchSvc', 'FirebaseUrl', '$scope', function(SearchSvc, FirebaseUrl, $scope){
    var self = this;

    var searchSvc = new SearchSvc();

    this.wantIds = [];
    this.haveIds = [];

    this.wants = [];
    this.haves = [];
    // TODO: var badSets = ['badSet'];

    this.searchByName = function(){
      self.cards = [];
      if ($scope.searchForm.length >= 3) {
        searchSvc.searchByName($scope.searchForm).then(function(data){
          data.forEach(function(card){
            // TODO: Create an object of known online only sets and compare the set name
            // To the object and remove those results
            self.cards.push(card);
          });
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
          self.wantIds.push(self.cards[index].id);
        } else {
          self.haveIds.push(self.cards[index].id);
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
            self.wantIds.push(self.cards[index].id);
          } else {
            self.haveIds.push(self.cards[index].id);
          }
        }
      }
    };

    this.removeItemHave = function(index){
      for(var i = 0; i < self.haves.length; i++){
        if (self.haves[i].id == index){
          self.haves.splice(i,1);
        }
      }

    };

    this.removeItemWant = function(index){
      for(var i = 0; i < self.wants.length; i++){
        if(self.wants[i].id == index){
          self.wants.splice(i,1);
        }
      }
    };

    this.pushCards = function(id){
      var user = FirebaseUrl.child('users').child(id);

      // Update the authdUser's information in Firebase
      user.update({
        wants: self.wantIds,
        haves: self.haveIds
      });
    };
}]);
