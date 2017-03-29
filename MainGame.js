Game.MainGame = function(game) {};

var map;
var layer;
var player;
var keyboard;
var player1Group;
var player2Group;
var players = [];
Game.MainGame.prototype = {
    create: function(game) {
        this.stage.backgroundColor = '#3A5963';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        keyboard = game.input.keyboard;

        map = this.add.tilemap('map');
        map.addTilesetImage('wall_steel', 'wall_steel');
        map.addTilesetImage('wall_brick', 'wall_brick');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();

        map.setCollisionBetween(1, 2);
        //Tạo Group player1
        player1Group = game.add.physicsGroup();
        player2Group = game.add.physicsGroup();

        players.push(
            new Player1Controller(
                200,
                200, {
                    up: Phaser.Keyboard.UP,
                    down: Phaser.Keyboard.DOWN,
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    fire: Phaser.Keyboard.SPACEBAR,
                    cooldown: 0.3
                }
            )
        );
        players.push(
            new Player2Controller(
                700,
                550, {
                    up: Phaser.Keyboard.W,
                    down: Phaser.Keyboard.S,
                    left: Phaser.Keyboard.A,
                    right: Phaser.Keyboard.D,
                    fire: Phaser.Keyboard.SPACEBAR,
                    cooldown: 0.3
                }
            )
        );
    },

    update: function(game) {
        this.physics.arcade.collide(player1Group, layer);
        this.physics.arcade.collide(player2Group, layer);
        this.physics.arcade.collide(player1Group,player2Group);
        players.forEach(
            function(ship) {
                ship.update();
            }
        );
    },
    render: function(game) {
        game.debug.body(players);
    }

};
