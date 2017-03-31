MainGame = function(game) {};

var map;
var layer;
var player;
var keyboard;
var player1Group;
var player2Group;
var players = [];
var bullets = [];
var bulletPlayer1Group;
var bulletPlayer2Group;
var wallbrickGroup;

var healthBarP1;
var healthBarP2;
var textHealth;

MainGame.prototype = {
    create: function(game) {
        game.stage.backgroundColor = '#000000';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        keyboard = game.input.keyboard;

        map = game.add.tilemap('map');
        map.addTilesetImage('wall_steel', 'wall_steel');
        map.addTilesetImage('wall_brick', 'wall_brick');
        map.addTilesetImage('water_1', 'water_1');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();

        map.setCollisionBetween(1, 6);
        //Tạo Group đạn
        bulletPlayer1Group = game.add.physicsGroup();
        bulletPlayer2Group = game.add.physicsGroup();
        //Tạo Group player
        player1Group = game.add.physicsGroup();
        player2Group = game.add.physicsGroup();

        //Group health
        healthBarGroup = game.add.physicsGroup();

        //Tạo group cho gạch
        wallbrickGroup = game.add.group();
        wallbrickGroup.enableBody = true;
        // wallbrickGroup.immovable = true;
        // wallbrickGroup.collideWorldBounds = true;
        map.createFromObjects('Object Layer 1', 2, 'wall_brick', 0, true, false, wallbrickGroup);
        wallbrickGroup.setAll('body.immovable', true);

        //Tạo âm thanh

        hit2 = game.add.audio('hit2');
        shot = game.add.audio('shot');
        boom = game.add.audio('boom');

        //Tao mang de luu nguoi choi
        players = [];
        players.push(
            new Player1Controller(
                200,
                200, {
                    up: Phaser.Keyboard.W,
                    down: Phaser.Keyboard.S,
                    left: Phaser.Keyboard.A,
                    right: Phaser.Keyboard.D,
                    fire: Phaser.Keyboard.F,
                    cooldown: 0.5
                },
                game
            )
        );
        players.push(
            new Player2Controller(
                500,
                500, {
                    up: Phaser.Keyboard.UP,
                    down: Phaser.Keyboard.DOWN,
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    fire: Phaser.Keyboard.SPACEBAR,
                    cooldown: 0.5
                },
                game
            )
        );

        //health
        textHealth = game.add.text(20, 0, 'P1', {
            fontSize: '8px',
            fill: '#000000'
        });
        textHealth = game.add.text(615, 0, 'P2', {
            fontSize: '8px',
            fill: '#000000'
        });
        healthb = game.add.image('healthBar');
        healthbbg = game.add.image('healthBarBG');
        healthBarP1 = new HealthBarController(
            new Phaser.Point(50, 10),
            players[0]
        )
        healthBarP2 = new HealthBarController(
            new Phaser.Point(650, 10),
            players[1]
        )

    },

    update: function(game) {
        game.physics.arcade.collide(player1Group, layer);
        game.physics.arcade.collide(player2Group, layer);
        game.physics.arcade.collide(player1Group, player2Group);
        game.physics.arcade.collide(player1Group, wallbrickGroup);
        game.physics.arcade.collide(player2Group, wallbrickGroup);
        players.forEach(
            function(ship) {
                ship.update();
            }
        );

        healthBarP1.update();
        healthBarP2.update();

        bullets.forEach(function(bullet) {
            if (bullet.update && typeof bullet.update == "function") {
                bullet.update();
            }
        });

        game.physics.arcade.overlap(
            bulletPlayer1Group,
            wallbrickGroup,
            onBulletHitWallBrick
        );
        game.physics.arcade.overlap(
            bulletPlayer2Group,
            wallbrickGroup,
            onBulletHitWallBrick
        );
        game.physics.arcade.overlap(
            bulletPlayer1Group,
            layer,
            onBulletHitLayer
        );
        game.physics.arcade.overlap(
            bulletPlayer2Group,
            layer,
            onBulletHitLayer
        );

        game.physics.arcade.overlap(
            bulletPlayer1Group,
            player2Group,
            onBullet1HitPlayer2
        )
        game.physics.arcade.overlap(
            bulletPlayer2Group,
            player1Group,
            onBullet2HitPlayer1
        )
    },
    render: function(game) {
        game.debug.body(players);
    }

};

function onBulletHitWallBrick(bulletPlayerGroup, wallbrickGroup) {
    bulletPlayerGroup.kill();
    wallbrickGroup.kill();
    hit2.play();
}

function onBulletHitLayer(bulletPlayerGroup, layer) {
    bulletPlayerGroup.kill();
}

function onBullet1HitPlayer2(bulletPlayer1Sprite, player2Sprite) {
    bulletPlayer1Sprite.kill();
    player2Sprite.damage(1);
    if (!player2Sprite.alive) {
        boom.play();
    }
}

function onBullet2HitPlayer1(bulletPlayer2Sprite, player1Sprite) {
    bulletPlayer2Sprite.kill();
    player1Sprite.damage(1);
    if (!player1Sprite.alive) {
        boom.play();
    }
}
