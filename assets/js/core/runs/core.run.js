(function() {
  'use strict';

  angular
    .module('app.core')
    .run(runBlock);

  runBlock.$inject = ['coreBootService'];

  function runBlock(coreBootService) {
    coreBootService.init();
  }
})();
