var map = new Map("map");
var _tileSize = 64; // taille d'une tile

window.onload = function() {
    // créer le stage qui contient tout les layers
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 960,
        height: 640
    });

    // créer le layer qui contient la map
    var layerMap = new Kinetic.Layer();

    // créer le layer qui contient la l'objet dragable
    var layerTurret = new Kinetic.Layer();

    // créer le layer qui contient l'interface
    var layerHUD = new Kinetic.Layer();

    // créer l'objet dragable  
    var imageObj = new Image();

    var turretBar = new Image();
    var coinBar = new Image();
    
    turretBar.onload = function() {
        var turretBAR = new Kinetic.Image({
            x: 5,
            y: 555,
            image: turretBar,
            width: 400,
            height: 80
        });
        
        var coinBAR = new Kinetic.Image({
            x: 555,
            y: 5,
            image: coinBar,
            width: 240,
            height: 34
        });

        // add the shape to the layer
        layerHUD.add(turretBAR);
        layerHUD.add(coinBAR);

        // add the layer to the stage
        stage.add(layerHUD);
    };
    coinBar.src = './Images/Interface/coinBar.png';
    turretBar.src = './Images/Interface/turretBar.png';

    // permet de tester si la tourelle est sur une case ou il n'a pas
    // le droit d'aller
    checkMapCollision = function(xPos, yPos) {
        if (map.getArrayMapTile(xPos, yPos) === 2) {
            return true;
        } else {
            return false;
        }
    };

    imageObj.onload = function() {
        var turret = new Kinetic.Image({
            x: 64,
            y: 64,
            image: imageObj,
            width: 64,
            height: 64,
            draggable: true
        });

        // créer un effet sur le curseur quand il est sur l'objet dragable
        turret.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        turret.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        // position de la tourelle sur la grille
        var posXGridTurret = 0;
        var posYGridTurret = 0;

        // backup position de la tourelle sur la grille
        var posXGridTurretB = 0;
        var posYGridTurretB = 0;

        // affiche la position en x et en y dans la console
        turret.on("dragend", function() {
            // recupere la position de la tourelle
            var points = turret.getPosition();

            var posYOk = false;
            var posXOk = false;

            // créer un backup de la position, utilisé plus tard 
            posXGridTurretB = posXGridTurret;
            posYGridTurretB = posYGridTurret;

            // redefinit la position a 0
            posXGridTurret = 0;
            posYGridTurret = 0;

            // gère le placement de la tourelle sur les cases
            while (!posXOk) {
                if (points.x < posXGridTurret + 33) {
                    turret.setPosition({x: posXGridTurret});
                    posXOk = true;
                } else {
                    posXGridTurret += 64;
                }
            }
            while (!posYOk) {
                if (points.y < posYGridTurret + 33) {
                    turret.setPosition({y: posYGridTurret});
                    posYOk = true;
                } else {
                    posYGridTurret += 64;
                }
            }

            // position de la tourelle sur la map en tile
            var xPosGrid = Math.ceil(posXGridTurret / 64);
            var yPosGrid = Math.ceil(posYGridTurret / 64);

            // check la collision de la tourelle
            if (checkMapCollision(yPosGrid, xPosGrid)) {
                turret.setPosition({x: posXGridTurretB});
                turret.setPosition({y: posYGridTurretB});
            }
        });
        // add the shape to the layer
        layerTurret.add(turret);
        // add the layer to the stage
        stage.add(layerTurret);
    };
    imageObj.src = './Images/Towers/MotarTower.png';
    // definit le canvas
    var canvas = layerMap.getCanvas();
    //definit le context
    var ctx = layerMap.getCanvas().getContext('2d');
    // definit la taille du canvas
    canvas.width = map.getLargeur() * _tileSize;
    canvas.height = map.getHauteur() * _tileSize;
    // ajoute le layer de la map au stage
    stage.add(layerMap);
    // dessine la map toute les 40 miliseconde
    setInterval(function() {
        // dessine la map
        map.dessinerMap(ctx);
        // ajoute le layer des tourelles au stage
        stage.add(layerTurret);
    }, 40);
};