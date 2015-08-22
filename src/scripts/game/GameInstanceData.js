/** --------------------------------------------------------
    game/GameInstanceData.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Data service that contains current game instance settings.
    -------------------------------------------------------- */

/* global GameInstanceData */

'use strict';

tbsGame.factory('GameInstanceData', function () {

    // Private vars
    var _worldSize    = 2,
        _numAIPlayers = 8;

    return {

        setWorldSize: function (worldSize) {
            _worldSize = worldSize;
        },

        setNumAIPlayers: function (numAIPlayers) {
            _numAIPlayers = numAIPlayers;
        },

        getWorldSize: function () {
            return _worldSize;
        },

        getNumAIPlayers: function () {
            return _numAIPlayers;
        }
    };
});
