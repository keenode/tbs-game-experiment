/** --------------------------------------------------------
    app.modules.js
    --------------------------------------------------------
    @author Keenan Staffieri
    AngularJS modules init.
    -------------------------------------------------------- */

'use strict';

// declare a module
var tbsHeader  = angular.module('tbsHeader',  ['ngMaterial']),
    tbsSidebar = angular.module('tbsSidebar', ['ngMaterial']),
    tbsGameRenderer = angular.module('tbsGameRenderer', ['ngMaterial']);

var tbsGame = angular.module('tbsGame', ['ngMaterial', 'tbsHeader', 'tbsSidebar', 'tbsGameRenderer']);
