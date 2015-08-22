/** --------------------------------------------------------
    game/StartupService.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Service that handles new game bootstrapping and startup.
    -------------------------------------------------------- */

/* global StartupService */

'use strict';

tbsGame.factory('StartupService', function ($rootScope, GameInstanceData, EmpireData, WorldService, UnitManager) {

    return {

        initNewGame: function (settings) {
            console.log('Start new game with settings: ', settings);

            // Store game instance data
            GameInstanceData.setWorldSize(settings.gameOptions.worldSize);
            GameInstanceData.setNumAIPlayers(settings.gameOptions.numAIPlayers);

            // Store empire data
            EmpireData.initEmpireData(settings.gameOptions.numAIPlayers);
            EmpireData.setLeaderName(0, settings.leader.name);
            EmpireData.setLeaderGender(0, settings.leader.gender);
            EmpireData.setNaming(0, {
                noun:      settings.civ.name.noun,
                pluarl:    settings.civ.name.pluarl,
                adjective: settings.civ.name.adjective,
            });
            EmpireData.setColors(0, settings.civ.color.primary, settings.civ.color.secondary);

            console.log('Generated empire data: ', EmpireData.getAllData());

            // Generate worlds
            WorldService.generateWorld(settings.gameOptions.worldSize);
            console.log('world data: ', WorldService.getWorldData());

            // Calculate starting positions in the world
            this.computeStartingLocations();

            // Issue message to WorldRenderer that map data is ready
            WorldService.notifyRenderer('MAP_DATA_READY');

            // Add starting units
            UnitManager.addStartingUnits();

            // Issue message that a new game has started
            $rootScope.$broadcast('NEW_GAME');
        },

        computeStartingLocations: function () {

            var numEmpires = EmpireData.getAllData().length,
                tiles      = WorldService.getWorldData(),
                numCols    = WorldService.getNumCols(),
                numRows    = WorldService.getNumRows();

            // Find a tile on the map that can have a unit and is not currently occupied 
            for(var i = 0; i < numEmpires; i++) {

                var isOccupied = true,
                    randPosX = null, randPosY = null;

                // Ensure that the randomly selected tile is not already occupied
                while(isOccupied) {

                    randPosX = Math.floor(Math.random() * numCols),
                    randPosY = Math.floor(Math.random() * numRows);

                    isOccupied = WorldService.getTileOccupied(randPosX, randPosY);
                }

                this.setStartingLocation(i, randPosX, randPosY);
            }
        },

        setStartingLocation: function (empireRef, xPos, yPos) {

            EmpireData.setStartPosition(empireRef, xPos, yPos);
            WorldService.setTileOccupied(xPos, yPos, true);

            console.log('Assigned starting location @: ', (xPos+1), (yPos+1));
        }
    };
});
