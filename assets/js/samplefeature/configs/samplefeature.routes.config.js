(function() {
  'use strict';

  angular
    .module('app.samplefeature')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', 'corePathsConstant'];

  function routesConfig($stateProvider, corePathsConstant) {
    $stateProvider
      .state('samplefeature', {
        controller: 'SampleFeatureController',
        controllerAs: 'vm',
        templateUrl: corePathsConstant.PARTIALS + 'samplefeature/index.html',
        url: ''
      });
  }
})();
