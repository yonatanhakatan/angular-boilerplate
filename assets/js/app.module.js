(function() {
    'use strict';

    angular
        .module('app', [
            // Core
            'app.core',
            // Features
            'app.samplefeature'
        ])
        .run(runBlock);

    runBlock.$inject = ['coreBootService'];

    function runBlock(coreBootService) {
        coreBootService.init();
    }
})();
