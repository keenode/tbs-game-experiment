/** --------------------------------------------------------
    ui/tbsHeader/UISidebarController.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Sidebar controller.
    -------------------------------------------------------- */

/* global tbsSidebar */

'use strict';

tbsSidebar.controller('UISidebarController', ['$scope', '$rootScope', 'EmpireData', function ($scope, $rootScope, EmpireData) {

    $scope.resources = null;
    $scope.credits = null;
    $scope.revenue = 3;

    $scope.totalPopulation = 300;

    $scope.units = {
        total: 2,
        max: 20
    };

    $scope.cities = {
        total: 1
    };

    $scope.structures = {
        total: 3
    };

    $rootScope.$on('EMPIRE_DATA_READY', function (event) {

        $scope.resources = EmpireData.getResources(0);
        $scope.credits = EmpireData.getCredits(0);
    });

}]);
