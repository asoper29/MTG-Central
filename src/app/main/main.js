'use strict';

angular.module('mtgCentral')

// Root Firebase reference instance used within all services
.factory('FirebaseUrl', function(CONFIG){
  return new Firebase(CONFIG.Firebase.baseUrl);
})

/**
* Auth(entication) Service
*
* @method {Promise} login
* @method {undefined} logout
* @method {undefined} onAuth
*
* @TODO: make onAuth return a promise?
*/

.factory('Auth', function (FirebaseUrl, $firebaseAuth, $firebase){

  var auth = $firebaseAuth(FirebaseUrl);

  return {

    /**
    * Wrapper for '$firebaseAuth.$onAuth()' that filters the
    * 'auth' object through the 'updateUser()' function
    */
    onAuth: function(cb){
      auth.$onAuth(function(data){
        cb(updateUser(data));
      });
    },

    /**
    * Wrapper for '$firebaseAuth.$authWithOAuthPopup()' that invokes
    * the correct provider code
    */
    login: function(){
      return auth.$authWithOAuthPopup('facebook');
    },


    // Wrapper for '$firebaseAuth.$unauth()'
    logout: function(){
      auth.$unauth();
    }
  }; // END service

  /**
  * Tranform the `authdUser` object from `$firebaseAuth` into a full User
  * record in the `/users` collection.
  *
  * @param {Object} authdUser from $firebaseAuth.getAuth()
  * @return {Object} from $firebase.$asObject()
  */
  function updateUser(authdUser){
    if ( authdUser === null ){
      return null;
    }

    /**
    * Create a reference to the users collection within Firebase
    * Then create a child of the users collection named after the
    * authdUser's Facebook ID
    */
    var user = FirebaseUrl.child('users').child(authdUser.uid);
    
    // Update the authdUser's information in Firebase
    user.update({
      uid: authdUser.uid,
      facebook: authdUser.facebook,
      fullName: authdUser.facebook.displayName,
      avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url
    });

    // Set user to the object reference of authdUser
    user = $firebase(FirebaseUrl
      .child('users')
      .child(authdUser.uid)
    ).$asObject();

    return user;
  } // END updateUser
}) // END factory(Auth)

/**
* Main application Controller
*
* @method {Promise} login -- trigger the login workflow
* @method {undefined} logout -- trigger the logout workflow
*/
.controller('MainCtrl', function(Auth){
  var self = this;

  this.login = Auth.login;

  this.logout = Auth.logout;

  Auth.onAuth(function(user){
    self.user = user;
  });
});
