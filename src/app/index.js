'use strict';

// Create our main mtgCentral module and injecting dependencies
angular.module('mtgCentral', ['ui.router', 'firebase'])

  // Declaring a constant variable for the base url
  .constant('CONFIG', {
    Firebase: {
      baseUrl: 'https://mtg-central.firebaseio.com/'
    }
  })

  // Configuring our routes
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    // Route to show our home page
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })

    // Route to show the listings
    .state('list', {
      url: '/list',
      templateUrl: 'app/listings/listings.html',
      controller: 'ListCtrl'
    })

    .state('profile',{
      url: '/profile/:id',
      templateUrl: 'app/profile/profile.html',
      controller: 'SearchCtrl'
    })

    .state('search', {
      url: '/search',
      templateUrl: 'app/search/search.html',
      controller: 'SearchCtrl'
    });

    // Catch all for routes
    // Send users to default route (home)
    $urlRouterProvider.otherwise('/');
  });
