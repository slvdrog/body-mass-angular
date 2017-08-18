'use strict';

/**
 * @ngdoc overview
 * @name bodyMassApp
 * @description
 * # bodyMassApp
 *
 * Main module of the application.
 */
angular
  .module('bodyMassApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'https://body-mass-api.herokuapp.com/',
      validateOnPageLoad: false
    });
  });

