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
        console.log(Object.keys(self.users));
      });
    };

    // TODO: Add a quantity array and cards array to haves.
    // ref.orderByChild("haves").limitToLast(1)
    //
    // .on("child_added", function(snapshot) {
    //   self.userHaves = snapshot.val().haves;
    //   // console.log(self.userHaves);
    //   // console.log(self.userHaves.toString());
    //   $.ajax({
    //       url: "http://api.mtgdb.info/cards/" + self.userHaves.toString(),
    //       success: function(data) {
    //         self.userHaves = data;
    //         console.log(self.userHaves);
    //       }
    //     });
    //     console.log(self.userHaves);
    // });
    //
    // console.log(self.userHaves);

      this.listings = [
        { 'id' : '1', 'description' : 'Standard, EDH, Foreign Foil', 'author' : 'Alex Soper', 'updated' : '12/3/14'},
        { 'id' : '2', 'description' : 'Commander, Legacy, Foreign Foil', 'author' : 'Jon Manock', 'updated' : '12/1/14'},
        { 'id' : '3', 'description' : 'Standard, Modern, Legacy', 'author' : 'Ally Hinton', 'updated' : '12/2/14'}
      ];



  });
