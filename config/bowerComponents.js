/** --------------------------------------------------------
    config/bowerComponents.js
    --------------------------------------------------------
    @author Keenan Staffieri
    List of bower components to inject into the main
    template.
    -------------------------------------------------------- */

// Path to bower_components folder
var bowerComponentsPath = './src/bower_components',

    /**
        Bower Components
        Array of bower resources.
    */
    bowerComponents = [
        bowerComponentsPath + '/jquery/dist/jquery.js',
        bowerComponentsPath + '/angular/angular.js',
        bowerComponentsPath + '/angular-aria/angular-aria.js',
        bowerComponentsPath + '/angular-animate/angular-animate.js',
        bowerComponentsPath + '/hammerjs/hammer.js',
        bowerComponentsPath + '/angular-material/angular-material.js',
        bowerComponentsPath + '/EaselJS/lib/easeljs-0.7.1.min.js'
    ];

// Make bowerComponents available from require
module.exports = bowerComponents;
