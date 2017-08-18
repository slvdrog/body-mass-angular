'use strict';

angular.module('bodyMassApp')
  .controller('CalculatorCtrl', function ($scope, BodyMass, alertService, $state) {
    $scope.category = '';
    $scope.bmi = '';

    $scope.handleBMIClick = function() {
      var height = $scope.bmiForm.height / 100
      BodyMass.save({height: height, weight: $scope.bmiForm.weight }, function(response){
        $scope.bmi = response.bmi;
        $scope.category = response.category;
      });
    };

    if (!$scope.user.signedIn) {
      alertService.add('danger', "You must be signed in to use the calculator. Please do so or sign up if you don't have an account");
      $state.go('sign_in');
    }
  });
