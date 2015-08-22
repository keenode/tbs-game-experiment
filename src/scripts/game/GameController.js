/** --------------------------------------------------------
    game/GameController.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Main game controller.
    -------------------------------------------------------- */

/* global GameController */

'use strict';

tbsGame.controller('GameController', ['$scope', '$rootScope', '$mdDialog', 'StartupService', function ($scope, $rootScope, $mdDialog, StartupService) {

    $mdDialog.show({
        controller: 'UIStartMenuController',
        templateUrl: 'views/ui/startmenu/UIStartMenuView.html',
        clickOutsideToClose: false,
        escapeToClose: false
        // targetEvent: ev
    })
    .then(function (answer) {
        // alert('you said ok');
    }, function () {
      // alert('you cancalled it');
    });

    $rootScope.$on('NEW_GAME', function (event) {
        $mdDialog.hide();
    });

}]);
