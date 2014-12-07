'use strict';

// Create our main mtgCentral module and injecting dependencies
angular.module('mtgCentral', ['ngCookies', 'ngSanitize', 'restangular', 'ui.router', 'uiRouterStyles', 'firebase'])

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
      controller: 'MainCtrl',
      data: {
        css: 'app/main/mainMTG.css'
      }
    })

    // Route to show the listings
    .state('list', {
      url: '/list',
      templateUrl: 'app/listings/listings.html',
      controller: 'ListCtrl',
      data: {
        css: 'app/listings/listings.css'
      }
    })

    .state('list.profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html',
      data: {
        css: 'app/profile/profile.css'
      }
    })


    .state('search', {
      url: '/search',
      templateUrl: 'app/search/search.html',
      controller: 'SearchCtrl',
      data: {
        css: 'app/search/search.css'
      }

    });

    // Catch all for routes
    // Send users to default route (home)
    $urlRouterProvider.otherwise('/');
  });
