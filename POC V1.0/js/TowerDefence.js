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

    // créer l'objet dragable  
    var imageObj = new Image();
    imageObj.onload = function() {
        var turret = new Kinetic.Image({
            x: 0,
            y: 0,
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

        // add the shape to the layer
        layerTurret.add(turret);

        // add the layer to the stage
        stage.add(layerTurret);
    };
    imageObj.src = './tilesets/turret.png';

    // definit le canvas
    var canvas = layerMap.getCanvas();
    //definit le context
    var ctx = layerMap.getCanvas().getContext('2d');

    // definit la taille du canvas
    canvas.width = map.getLargeur() * _tileSize;
    canvas.height = map.getHauteur() * _tileSize;

    // ajoute le layer de la map au stage
    stage.add(layerMap);

    // ajoute le layer des tourelles au stage
    stage.add(layerTurret);

    // dessine la map toute les 40 miliseconde
    setInterval(function() {
        // dessine la map
        map.dessinerMap(ctx);
    }, 40);
};