var map = new Map("map");
var _tileSize = 64; // taille d'une tile

window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = map.getLargeur() * _tileSize;
    canvas.height = map.getHauteur() * _tileSize;

    setInterval(function() {
        map.dessinerMap(ctx);
    }, 40);
};