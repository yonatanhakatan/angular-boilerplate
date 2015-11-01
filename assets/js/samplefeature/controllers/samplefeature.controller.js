(function() {
    angular
        .module('app.samplefeature')
        .controller('SampleFeatureController', SampleFeatureController);

    SampleFeatureController.$inject = [];

    function SampleFeatureController() {
        var vm = this;
    }
})();
