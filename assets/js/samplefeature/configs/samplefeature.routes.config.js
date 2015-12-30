(function() {
  'use strict';

  angular
    .module('app.samplefeature')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', 'corePathsConstant'];

  function routesConfig($stateProvider, corePathsConstant) {
    $stateProvider
      .state('sampleFeaturePage1', {
        controller: 'SampleFeatureController',
        controllerAs: 'vm',
        templateUrl: corePathsConstant.PARTIALS + 'samplefeature/page1.html',
        url: '/'
      })
      .state('sampleFeaturePage2', {
        controller: 'SampleFeatureController',
        controllerAs: 'vm',
        templateUrl: corePathsConstant.PARTIALS + 'samplefeature/page2.html',
        url: 'page2'
      });
  }
})();
