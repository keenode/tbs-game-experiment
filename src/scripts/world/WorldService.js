/** --------------------------------------------------------
    world/WorldService.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Service that handles the game worlds.
    -------------------------------------------------------- */

/* global WorldService */

'use strict';

tbsGame.factory('WorldService', function ($rootScope) {

    // Private vars
    var _worldData = {
            name: "Test World",
            tiles: new Array()
        },
        _numCols = 0,
        _numRows = 0;

    return {

        generateWorld: function (worldSize) {

            console.log('Create world with size ' + worldSize);

            this.setWorldSize(worldSize);

            // Create entirely random world
            for(var y = 0; y < _numRows; y++) {

                _worldData.tiles.push({ row: new Array() });

                for(var x = 0; x < _numCols; x++) {

                    var randTile = Math.floor(Math.random()*3),
                        tileType = null;

                    switch(randTile) {
                        case 0:
                            tileType = 'GRASSLAND';
                            break;
                        case 1:
                            tileType = 'WOODS';
                            break;
                        case 2:
                            tileType = 'SEA';
                            break;
                        default:
                            tileType = 'UNASSIGNED'
                    }

                    _worldData.tiles[y].row.push({ type: tileType, occupied: false });
                }
            }
        },

        setWorldSize: function (worldSize) {

            switch(worldSize) {
                case 0: // Tiny
                    _numCols = 6;
                    _numRows = 4;
                    break;
                case 1: // Small
                    _numCols = 10;
                    _numRows = 6;
                    break;
                case 2: // Medium
                    _numCols = 16;
                    _numRows = 10;
                    break;
                case 3: // Large
                    _numCols = 24;
                    _numRows = 12;
                    break;
                case 4: // Huge
                    _numCols = 32;
                    _numRows = 24;
                    break;
            }
        },

        setTileOccupied: function (x, y, occupied) {
            _worldData.tiles[y].row[x].occupied = occupied;
        },

        notifyRenderer: function (notification) {

            switch(notification) {
                case 'MAP_DATA_READY':
                    $rootScope.$broadcast('MAP_DATA_READY');
            }
        },

        getNumCols: function () {
            return _numCols;
        },

        getNumRows: function () {
            return _numRows;
        },

        getTileOccupied: function (x, y) {
            return _worldData.tiles[y].row[x].occupied;
        },

        getWorldData: function () {
            return _worldData;
        }
    };
});
