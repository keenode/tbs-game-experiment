/** --------------------------------------------------------
    game/EmpireData.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Data service for empires in the current game.
    -------------------------------------------------------- */

/* global EmpireData */

'use strict';

tbsGame.factory('EmpireData', function ($rootScope) {

    // Private vars
    var _empireData = new Array();

    return {

        // Init game for number of AI Players +1 for player (index 0)
        initEmpireData: function (numAIPlayers) {

            // Init Player
            _empireData.push({
                leaderName:     null,
                leaderGender:   null,
                naming:         { noun: null, pluarl: null, adjective: null },
                primaryColor:   { red: 255, green: 255, blue: 255 },
                secondaryColor: { red: 255, green: 255, blue: 255 },
                resources: {
                    food:      0,
                    maxFood:   200,
                    carbon:    0,
                    maxCarbon: 200,
                    ore:       0,
                    maxOre:    200,
                    energy:    0,
                    maxEnergy: 200
                },
                credits: 0,
                units: new Array(),
                startPosition: { x: null, y: null }
            });

            // Init AI Players
            for(var p = 0; p < numAIPlayers; p++) {
                _empireData.push({
                    leaderName:     'AI Player ' + (p+1),
                    leaderGender:   'Male',
                    naming:         { noun: 'America', pluarl: 'Americans', adjective: 'American' },
                    primaryColor:   { red: Math.floor(Math.random() * 255), green: Math.floor(Math.random() * 255), blue: Math.floor(Math.random() * 255) },
                    secondaryColor: { red: Math.floor(Math.random() * 255), green: Math.floor(Math.random() * 255), blue: Math.floor(Math.random() * 255) },
                    resources: {
                        food:      0,
                        maxFood:   200,
                        carbon:    0,
                        maxCarbon: 200,
                        ore:       0,
                        maxOre:    200,
                        energy:    0,
                        maxEnergy: 200
                    },
                    credits: 0,
                    units: new Array(),
                    startPosition: { x: null, y: null }
                });
            }

            // Broadcast that empire data is ready
            $rootScope.$broadcast('EMPIRE_DATA_READY');
        },

        setLeaderName: function (ref, leaderName) {
            _empireData[ref].leaderName = leaderName;
        },

        setLeaderGender: function (ref, leaderGender) {
            _empireData[ref].leaderGender = leaderGender;
        },

        setNaming: function (ref, naming) {
            _empireData[ref].naming = naming;
        },

        setColors: function (ref, primaryColor, secondaryColor) {
            _empireData[ref].primaryColor   = primaryColor;
            _empireData[ref].secondaryColor = secondaryColor;
        },

        setResource: function (ref, resourceLabel, amount) {
            _empireData[ref].resources[resourceLabel] = amount;
        },

        setCredits: function (ref, amount) {
            _empireData[ref].credits = amount;
        },

        setStartPosition: function (ref, x, y) {
            _empireData[ref].startPosition.x = x;
            _empireData[ref].startPosition.y = y;
        },

        addUnit: function (ref, unitObj) {
            _empireData[ref].units.push(unitObj);
        },

        getLeaderName: function (ref) {
            return _empireData[ref].leaderName;
        },

        getLeaderGender: function (ref) {
            return _empireData[ref].leaderGender;
        },

        getNaming: function (ref, namingForm) {
            switch(namingForm) {
                case 'noun':
                    return _empireData[ref].naming.noun;
                    break;
                case 'pluarl':
                    return _empireData[ref].naming.pluarl;
                    break;
                case 'adjective':
                    return _empireData[ref].naming.adjective;
                    break;
            }
        },

        getPrimaryColor: function (ref) {
            return _empireData[ref].primaryColor;
        },

        getSecondaryColor: function (ref) {
            return _empireData[ref].secondaryColor;
        },

        getResource: function (ref, resourceLabel) {
            return _empireData[ref].resources[resourceLabel];
        },

        getResources: function (ref) {
            return _empireData[ref].resources;
        },

        getCredits: function (ref) {
            return _empireData[ref].credits;
        },

        getUnits: function (ref) {
            return _empireData[ref].units;
        },

        getStartPosition: function (ref) {
            return _empireData[ref].startPosition;
        },

        getAllData: function () {
            return _empireData;
        }
    };
});
