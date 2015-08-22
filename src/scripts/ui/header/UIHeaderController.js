/** --------------------------------------------------------
    ui/header/UIHeaderController.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Header controller.
    -------------------------------------------------------- */

/* global tbsHeader */

'use strict';

tbsHeader.controller('UIHeaderController', ['$scope', '$rootScope', 'EmpireData', function ($scope, $rootScope, EmpireData) {

    $scope.leaderName = '';
    $scope.empireName = '';

    $scope.tick = 0;
    // $scope.timeForNextTick = '30s';

    $rootScope.$on('NEW_GAME', function (event) {
        $scope.leaderName = EmpireData.getLeaderName(0);
        $scope.empireName = EmpireData.getNaming(0, 'noun');
    });

    $scope.save = function() {
        alert('Save');
    };

    $scope.saveAs = function() {
        alert('Save As');
    };

    $scope.load = function() {
        alert('Load');
    };

    $scope.settings = function() {
        alert('Settings');
    };

    $scope.new = function() {
        alert('New');
    };
}]);
