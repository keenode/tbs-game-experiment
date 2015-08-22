/** --------------------------------------------------------
    world/GameRendererDirective.js
    --------------------------------------------------------
    @author Keenan Staffieri
    Game rendering logic.
    -------------------------------------------------------- */

/* global tbsGameRenderer */

'use strict';

tbsGameRenderer.directive('gameRenderer', function ($rootScope, WorldService, EmpireData) {
    return {
        restrict: 'E',
        templateUrl: 'views/renderer/GameRendererView.html',
        link: function(scope, element, attrs) {

            // Init canvas stage
            var _mapCanvasId = element.find('canvas')[0],
                _stage = new createjs.Stage(_mapCanvasId);

            // Init world container
            var _worldContainer = new createjs.Container(),
                _tileSize = 64;

            _stage.addChild(_worldContainer);

            // Create FPS counter
            var _fpsTxt = new createjs.Text('? fps', 'bold 14px Monda', '#ffffff');
                _fpsTxt.x = 10;
                _fpsTxt.y = 10;

            _stage.addChild(_fpsTxt);

            // Create test circle
            // var _circle = new createjs.Shape();
            //     _circle.graphics.beginFill('red').drawCircle(0, 0, 50);
            //     _circle.x = 100;
            //     _circle.y = 100;

            // _stage.addChild(_circle);

            // Set timing mode and FPS
            createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
            createjs.Ticker.setFPS(60);

            // Init the renderUpdate ticker
            createjs.Ticker.addEventListener('tick', function(e) { renderUpdate(e) });


            $rootScope.$on('MAP_DATA_READY', function (event) {

                // Add tiles to map
                var tiles = WorldService.getWorldData().tiles;

                console.log('tiles: ', tiles);

                // Add tile shapes to canvas
                for(var y = 0; y < WorldService.getNumRows(); y++) {
                    for(var x = 0; x < WorldService.getNumCols(); x++) {

                        // Determine which graphics to render on this tile
                        var type = tiles[y].row[x].type,
                            shape = assignShape(type, x, y);

                        /* Store tile graphics in renderer so tiles can be changed or 
                            removed later */
                        // this.tiles[y][x].shape = shape;

                        // Add the tile to the world
                        _worldContainer.addChild(shape);

                        // Add DEBUG Text
                        if(tiles[y].row[x].occupied) {
                            var debugText = new createjs.Text('occupied', 'bold 12px Monda', '#ffffff');
                                debugText.x = _tileSize * x;
                                debugText.y = _tileSize * y + _tileSize - 20;
                            _worldContainer.addChild(debugText);
                        }

                        // Show coordinate
                        var coordText = new createjs.Text('(' + (x+1) + ', ' + (y+1) + ')', 'bold 10px Monda', '#000000');
                            coordText.x = _tileSize * x;
                            coordText.y = _tileSize * y;
                        _worldContainer.addChild(coordText);
                    }
                }
            });


            $rootScope.$on('UNITS_READY', function (event) {

                var numEmpires = EmpireData.getAllData().length;

                // Loop through each empire and get units
                for(var i = 0; i < numEmpires; i++) {

                    var units = EmpireData.getUnits(i),
                        primaryColor = EmpireData.getPrimaryColor(i),
                        secondaryColor = EmpireData.getSecondaryColor(i);

                    // Add empire's units to the world
                    for(var u = 0; u < units.length; u++) {

                        var unitShape = new createjs.Shape();
                            unitShape.graphics.
                                setStrokeStyle(2).
                                beginStroke('rgba(' + secondaryColor.red + ', ' + secondaryColor.green + ', ' + secondaryColor.blue + ', 1)').
                                beginFill('rgba(' + primaryColor.red + ', ' + primaryColor.green + ', ' + primaryColor.blue + ', 1)').
                                drawCircle(0, 0, 16);

                            var startPosition = EmpireData.getStartPosition(i);

                            unitShape.x = startPosition.x * _tileSize + _tileSize / 2;
                            unitShape.y = startPosition.y * _tileSize + _tileSize / 2;

                        _stage.addChild(unitShape);

                        // Bind click events and add 'P' indicator only on player units
                        if(i === 0) {
                            unitShape.addEventListener('click', function (event) { alert("clicked"); });

                            var playerIndicator = new createjs.Text('P', 'bold 16px Monda', '#ffffff');
                                playerIndicator.x = unitShape.x - 5;
                                playerIndicator.y = unitShape.y - 13;
                            _stage.addChild(playerIndicator);
                        }
                    }
                }
            });


            function assignShape(type, xPos, yPos) {

                // Create tile graphic based on type
                var tileColor = null;

                switch(type) {
                    case 'GRASSLAND':
                        tileColor = '#208f12';
                        break;
                    case 'WOODS':
                        tileColor = '#144800'
                        break;
                    case 'SEA':
                        // tileColor = '#00c0ff'
                        tileColor = '#84a510'
                        break;
                }

                var shape = new createjs.Shape();
                    shape.graphics.setStrokeStyle(0.1);
                    shape.graphics.beginStroke('black');
                    shape.graphics.beginFill(tileColor).drawRect(_tileSize*xPos, _tileSize*yPos, _tileSize, _tileSize);

                return shape;
            }


            function renderUpdate(e) {

                var dt = e.delta / 1000;

                // move 100 pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond):
                // _circle.x += dt * 100;

                // if(_circle.x > _stage.canvas.width) { _circle.x = 0; }

                // Update FPS text
                _fpsTxt.text = createjs.Ticker.getMeasuredFPS().toFixed(1) + ' fps';

                _stage.update();
            }
        }
    };
});
