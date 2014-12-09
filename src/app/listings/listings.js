'use strict';

angular.module('mtgCentral')

  .factory('GetUsers', function($firebase, FirebaseUrl){
    return $firebase(FirebaseUrl.child('users')).$asObject();
  })

  .controller('ListCtrl', function(GetUsers){
    var self = this;
    this.userHaves = [];
    this.users = GetUsers;
    console.log(this.users);

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
