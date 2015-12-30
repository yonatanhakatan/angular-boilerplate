describe('Core module', function() {
  var coreBootService;

  beforeEach(function() {
    module('app.core', function($provide) {
      $provide.value('coreBootService', {
        init: jasmine.createSpy()
      });
    });

    inject(function(_coreBootService_) {
      coreBootService = _coreBootService_;
    });
  });

  describe('When the core module is run', function() {
    it('The boot service should be called', function() {
      expect(coreBootService.init.calls.count()).toEqual(1);
    });
  });

});
