Game.MainGame = function(game) {};

var map;
var layer;
// var player;

Game.MainGame.prototype = {
    create: function(game) {
        this.stage.backgroundColor = '#3A5963';
        map = this.add.tilemap('map');
        map.addTilesetImage('wall_steel', 'wall_steel');
        map.addTilesetImage('wall_brick', 'wall_brick');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();
    },

    update: function() {

    },


};
