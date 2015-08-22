/** --------------------------------------------------------
    ui/header/UIHeaderDirective.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Header directive.
    -------------------------------------------------------- */

/* global tbsHeader */

'use strict';

tbsHeader.directive('uiHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/ui/header/UIHeaderView.html'
    };
});
