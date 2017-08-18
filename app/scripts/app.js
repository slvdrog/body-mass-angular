'use strict';

angular
  .module('bodyMassApp', [
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth',
    'ui.bootstrap'
  ])
  .config(function($stateProvider) {

    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: 'views/main.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
      })
      .state('bmi', {
        url: '/calculator',
        templateUrl: 'views/bmi.html',
        controller: 'CalculatorCtrl'
      })
      .state('sign_in', {
        url: '/sign_in',
        templateUrl: 'views/sign_in.html'
      })
      .state('sign_up', {
        url: '/sign_up',
        templateUrl: 'views/sign_up.html'
      });
  })
  .config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'https://body-mass-api.herokuapp.com',
      validateOnPageLoad: false
    });
  })
  .config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  })
  .run(function($rootScope, $state, alertService){

    $rootScope.$on('auth:login-success', function(ev, user){
      alertService.add('success', 'Sign in successfull');
      $state.go('bmi');
    })

    $rootScope.$on('auth:login-error', function(ev, reason) {
      alertService.add('danger', 'Sign in failed.');
    });

    $rootScope.$on('auth:logout-success', function(ev) {
      alertService.add('success', 'Sign out successfull.');
      $state.go('welcome');
    });

    $rootScope.$on('auth:registration-email-success', function(ev, message) {
      alertService.add('success', 'Sign up successfull, please log in.');
      $state.go('sign_in');
    });

    $rootScope.$on('auth:registration-email-error', function(ev, reason) {
      alertService.add('danger', 'Sign up failed.');
    });

    $rootScope.$on('auth:session-expired', function(ev) {
      alertService.add('warning', 'Session expired.');
      $state.go('welcome');
    });
  });