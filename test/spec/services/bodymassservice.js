'use strict';

describe('Service: bodyMassService', function () {

  // load the service's module
  beforeEach(module('bodyMassApp'));

  // instantiate service
  var bodyMassService;
  beforeEach(inject(function (_bodyMassService_) {
    bodyMassService = _bodyMassService_;
  }));

  it('should do something', function () {
    expect(!!bodyMassService).toBe(true);
  });

});
