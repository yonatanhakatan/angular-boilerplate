(function() {
  'use strict';

  angular
    .module('app.core')
    .config(configBlock);

  configBlock.$inject = ['$locationProvider'];

  function configBlock($locationProvider) {
    $locationProvider.html5Mode(true);
  }
})();
