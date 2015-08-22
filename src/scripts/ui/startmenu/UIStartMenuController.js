/** --------------------------------------------------------
    ui/startmenu/UIStartMenuController.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Start menu controller.
    -------------------------------------------------------- */

/* global tbsSidebar */

'use strict';

tbsGame.controller('UIStartMenuController', ['$scope', 'StartupService', function ($scope, StartupService) {

    $scope.modalTitle = "TBS Game";
    $scope.menuState = 'INITIAL';

    $scope.worldSizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];

    $scope.newGameObj = {
        leader: {
            name: '',
            gender: ''
        },
        civ: {
            name: {
                noun: '',
                pluarl: '',
                adjective: ''
            },
            color: {
                primary: {
                    red: Math.floor(Math.random() * 255),
                    green: Math.floor(Math.random() * 255),
                    blue: Math.floor(Math.random() * 255)
                },
                secondary: {
                    red: Math.floor(Math.random() * 255),
                    green: Math.floor(Math.random() * 255),
                    blue: Math.floor(Math.random() * 255)
                }
            }
        },
        gameOptions: {
            worldSize: 2,
            numAIPlayers: 7
        }
    };

    $scope.newGame = function () {
        $scope.modalTitle = "New Game";
        $scope.menuState = 'NEW_GAME';
    };

    $scope.loadGame = function () {
        alert('Load Game');
    };

    $scope.startGame = function () {
        StartupService.initNewGame($scope.newGameObj);
    };

    $scope.goBack = function () {
        $scope.modalTitle = "TBS Game";
        $scope.menuState = 'INITIAL';
    };

}]);
