'use strict';

angular.module('bodyMassApp')
  .service('BodyMass', function ($resource, $auth) {
    return $resource('https://body-mass-api.herokuapp.com/body_masses');
  });
