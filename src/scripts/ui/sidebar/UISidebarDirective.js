/** --------------------------------------------------------
    ui/sidebar/UISidebarDirective.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Header directive.
    -------------------------------------------------------- */

/* global tbsSidebar */

'use strict';

tbsSidebar.directive('uiSidebar', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/ui/sidebar/UISidebarView.html'
    };
});
