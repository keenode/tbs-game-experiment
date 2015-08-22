/** --------------------------------------------------------
    units/UnitManager.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Service that manages all game units.
    -------------------------------------------------------- */

/* global UnitManager */

'use strict';

tbsGame.factory('UnitManager', function ($rootScope, EmpireData) {

    return {

        addStartingUnits: function () {

            var numEmpires = EmpireData.getAllData().length;

            for(var i = 0; i < numEmpires; i++) {

                EmpireData.addUnit(i, {
                    name: 'Colonist',
                    attack: 1,
                    defense: 1,
                    moves: 2
                });

                // EmpireData.addUnit(i, {
                //     name: 'Worker'
                // });
            }

            $rootScope.$broadcast('UNITS_READY');
        }
    };
});
