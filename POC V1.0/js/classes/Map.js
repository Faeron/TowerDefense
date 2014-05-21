function Map(nom) {
    // Création de l'objet XmlHttpRequest
    var xhr = getXMLHttpRequest();

    // Chargement du fichier
    xhr.open("GET", './maps/' + nom + '.json', false);
    xhr.send(null);
    if (xhr.readyState !== 4 || (xhr.status !== 200 && xhr.status !== 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nomm�e \"" + nom + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;

    // Analyse des donn�es
    var mapData = JSON.parse(mapJsonData);
    this.tileset = new Tileset(mapData.tileset);
    this.terrain = mapData.terrain;
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHauteur = function() {
    return this.terrain.length;
};
Map.prototype.getLargeur = function() {
    return this.terrain[0].length;
};

Map.prototype.dessinerMap = function(context) {
    for (var i = 0; i < this.terrain.length; i++) {
        var ligne = this.terrain[i];
        var y = i * _tileSize;
        for (var j = 0; j < ligne.length; j++) {
            this.tileset.dessinerTile(ligne[j], context, j * _tileSize, y);
        }
    }
};

// récupère la tile selectionner dans le tableau de la map [permet de savoir quel tile est à cette emplacement]
Map.prototype.getArrayMapTile = function(xPos,yPos) {
    return this.terrain[xPos][yPos];
};