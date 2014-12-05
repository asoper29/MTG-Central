'use strict';

angular.module('mtgCentral')



  .controller('ListCtrl', function (){
      this.listings = [
        { 'id' : '1', 'description' : 'Standard, EDH, Foreign Foil', 'author' : 'Alex Soper', 'updated' : '12/3/14'},
        { 'id' : '2', 'description' : 'Commander, Legacy, Foreign Foil', 'author' : 'Jon Manock', 'updated' : '12/1/14'},
        { 'id' : '3', 'description' : 'Standard, Modern, Legacy', 'author' : 'Ally Hinton', 'updated' : '12/2/14'}
      ];

      // var ref = new Firebase("https://mtg-central.firebaseio.com/");
      //
      // ref.on("value", function(snapshot) {
      //   $scope.cards = snapshot.val();
      //   console.log(snapshot.val());
      // }, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });

  });
