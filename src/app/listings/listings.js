'use strict';

angular.module('mtgCentral')

  .factory('GetUsers', function($firebase, FirebaseUrl){
    return $firebase(FirebaseUrl.child('users')).$asObject();
  })

  .factory('UserSearch', function($q, $http){
    function UserSearch() {}
    UserSearch.prototype.autoByName = function(searchString) {
      // TODO: Figure out the best way to add a delay
      return $http.get('http://api.mtgdb.info/search/' + searchString);
    };
    return (UserSearch);
  })

  .controller('ListCtrl', function($firebase, FirebaseUrl, GetUsers, UserSearch, $scope){
    var self = this;
    // this.users = GetUsers;
    var searchUser = new UserSearch();

    this.autoByName = function(){
      self.cards = [];
      if ($scope.searchForm.length >= 3) {
        searchUser.autoByName($scope.searchForm).success(function(data){
          self.cards = data;
        });
      }
    };

    this.searchItem = function(card) {
      $scope.searchForm = card.name;
      self.users = $firebase(FirebaseUrl.child('cardusers').child(card.id).child('have')).$asObject();
      self.users.$loaded(function(){
      });
    };
  });
