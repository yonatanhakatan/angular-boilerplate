(function() {
  'use strict';

  angular
    .module('app.core')
    .service('coreBootService', coreBootService);

  coreBootService.$inject = [];

  function coreBootService() {
    /*jshint validthis: true */
    this.init = init;

    function init() {
      // Tasks that need to happen when the
      // app launches should be written here
    }
  }
})();
