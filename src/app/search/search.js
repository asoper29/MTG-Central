'use strict';

angular.module('mtgCentral')

  .factory('cards', ['$firebase', function($firebase){
    var ref = new Firebase('https://mtg-central.firebaseio.com/cards')
    .limitToFirst(500);
    return $firebase(ref).$asArray();
  }])

  .factory('SearchSvc', ['$q', function($q){
    function SearchSvc() {}
    SearchSvc.prototype.searchByName = function(searchString) {
      var deffered = $q.defer();
      if (searchString.length >= 3) {
        // Figure out the best way to add a delay
        $.ajax({
          url: "http://api.mtgdb.info/search/" + searchString,
          success: function(data) {
            console.log(data);
            deffered.resolve(data);
          }
        });
      }

      return deffered.promise;

    };
    return (SearchSvc);
  }])

  .controller('SearchCtrl', ['cards', 'SearchSvc', '$scope', function(cards, SearchSvc, $scope){
    var self = this;

    var searchSvc = new SearchSvc();

    this.sets = cards;
    this.haves = [];
    //var badSets = ['badSet'];

    this.cards = [];

    this.searchByName = function(){
      self.cards = [];
      searchSvc.searchByName($scope.searchForm).then(function(data){
        data.forEach(function(card){
          // Create an object of known online only sets and compare the set name
          // To the object and remove those results
          self.cards.push(card);
        });
      });
    };

    this.addItem = function(index){
      if(self.haves.length === 0){
        self.haves.push(self.cards[index]);
      } else {
        var duplicate = false;
        self.haves.some(function (value) {
          var tempId = self.cards[index].id;
          if (value.id === tempId) {
            duplicate = true;
          }
        });
        if (duplicate === false) {
          self.haves.push(self.cards[index]);
        }
      }
    };
}]);
