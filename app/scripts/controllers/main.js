'use strict';

angular.module('bodyMassApp')
  .controller('MainCtrl', function ($scope, $auth, BodyMass, $http) {
    $scope.category = 'Input your data and calculate your BMI';

    $scope.handleLogin = function(form) {
      $auth.submitLogin(form)
        .then(function(response){
        })
        .catch(function(response){
        });
    };

    $scope.handleRegistration = function(form) {
      $auth.submitRegistration(form)
        .then(function(response){
        })
        .catch(function(response){
        });
    };

    $scope.handleSignOut = function() {
      $auth.signOut()
        .then(function(response){
        })
        .catch(function(response){
        });
    };

    $scope.handleBMIClick = function(form) {
      BodyMass.save(form, function(response){
        console.log(response);
        $scope.category = response.category;
      });
    };
  });
