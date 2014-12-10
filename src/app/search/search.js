'use strict';

angular.module('mtgCentral')

  .factory('SearchSvc', function($q, $http){
    function SearchSvc() {}
    SearchSvc.prototype.searchByName = function(searchString) {
      // TODO: Figure out the best way to add a delay
       return $http.get('http://api.mtgdb.info/search/' + searchString);
      };
      return (SearchSvc);
    })


  .controller('SearchCtrl',
  function(Auth, SearchSvc, FirebaseUrl, $scope, $firebase){
    var self = this;

    var searchSvc = new SearchSvc();

    Auth.onAuth(function(user){
      self.user = user;
    });

    self.user.$loaded(function(){
      self.haves = $firebase(FirebaseUrl.child('usercards').child(self.user.uid).child('have')).$asObject();
      self.wants = $firebase(FirebaseUrl.child('usercards').child(self.user.uid).child('want')).$asObject();
    });

    this.searchByName = function(){
      self.cards = [];
      if ($scope.searchForm.length >= 3) {
        searchSvc.searchByName($scope.searchForm).success(function(data){
            self.cards = data;
          });
       }
    };

    this.addItemHave = function(card){
      var cardUsers = FirebaseUrl.child('cardusers').child(card.id).child('have').child(self.user.uid);
      var userCards = FirebaseUrl.child('usercards').child(self.user.uid).child('have').child(card.id);

      // Update the authdUser's information in Firebase
      cardUsers.update({
        facebook: {uid: self.user.uid, fullName: self.user.fullName, avatarUrl: self.user.avatarUrl}, 
        cond: 'NM',
        qty: 1
      });

      userCards.update({
        name: card.name,
        cardSetName: card.cardSetName,
        cond: 'NM',
        qty: 1
      });
    };

    this.addItemWant = function(card){
      var cardUsers = FirebaseUrl.child('cardusers').child(card.id).child('want').child(self.user.uid);
      var userCards = FirebaseUrl.child('usercards').child(self.user.uid).child('want').child(card.id);

      // Update the authdUser's information in Firebase
      cardUsers.update({
        cond: 'NM',
        qty: 1
      });

      userCards.update({
        name: card.name,
        cardSetName: card.cardSetName,
        cond: 'NM',
        qty: 1
      });
    };


    this.removeItemHave = function(id){
      var cardUsers = FirebaseUrl.child('cardusers').child(id).child('have').child(self.user.uid);
      var userCards = FirebaseUrl.child('usercards').child(self.user.uid).child('have').child(id);

      cardUsers.remove();
      userCards.remove();
    };

    this.removeItemWant = function(id){
      var cardUsers = FirebaseUrl.child('cardusers').child(id).child('want').child(self.user.uid);
      var userCards = FirebaseUrl.child('usercards').child(self.user.uid).child('want').child(id);

      cardUsers.remove();
      userCards.remove();
    };
});
