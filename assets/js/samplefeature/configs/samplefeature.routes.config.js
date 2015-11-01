(function() {
    'use strict';

    angular
        .module('app.samplefeature')
        .config(sampleFeatureRoutesConfig);

    sampleFeatureRoutesConfig.$inject = ['$stateProvider', 'corePathsConstant'];

    function sampleFeatureRoutesConfig($stateProvider, corePathsConstant) {
        $stateProvider
            .state('samplefeature', {
                controller: 'SampleFeatureController',
                controllerAs: 'vm',
                templateUrl: corePathsConstant.PARTIALS + 'samplefeature/index.html',
                url: ''
            });
    }

})();
