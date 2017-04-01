MainGame = function(game) {};

var map;
var layer;
var player;
var keyboard;

//Tạo các group để kiểm soát các va chạm
var bulletPlayer1Group;
var bulletPlayer2Group;
var wallbrickGroup;
var waterGroup;
var treeGroup;
var player1Group;
var player2Group;
var players = [];
var bullets = [];

//Tạo các biến đẻ hiển thị thanh máu
var healthBarP1;
var healthBarP2;
var textHealth;
var player1Death =0;
var player2Death =0;
//Âm thanh
var checkSound = 1;

var menu;
MainGame.prototype = {
    create: function(game) {
        game.stage.backgroundColor = '#363636';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        keyboard = game.input.keyboard;

        map = game.add.tilemap('map');
        map.addTilesetImage('wall_steel', 'wall_steel');
        map.addTilesetImage('wall_brick', 'wall_brick');
        map.addTilesetImage('water_1', 'water_1');
        map.addTilesetImage('trees', 'trees');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();

        map.setCollisionBetween(1, 1);

        //Tạo group cho gạch
        wallbrickGroup = game.add.group();
        wallbrickGroup.enableBody = true;
        //Tạo Group đạn
        bulletPlayer1Group = game.add.physicsGroup();
        bulletPlayer2Group = game.add.physicsGroup();

        //Tạo Group player
        player1Group = game.add.physicsGroup();
        player2Group = game.add.physicsGroup();

        //Tạo Group đạn
        bulletPlayer1Group = game.add.physicsGroup();
        bulletPlayer2Group = game.add.physicsGroup();

        //Tạo Group player
        player1Group = game.add.physicsGroup();
        player2Group = game.add.physicsGroup();

        //Tạo group cho nước
        waterGroup = game.add.group();
        waterGroup.enableBody = true;
        treeGroup = game.add.group();
        treeGroup.enableBody = true;

        //Group health
        healthBarGroup = game.add.physicsGroup();

        //Tạo map từ Object trong tilemap và chuyển chúng vào group tương ứng
        map.createFromObjects('Object Layer 1', 2, 'wall_brick', 0, true, false, wallbrickGroup);
        map.createFromObjects('Object Layer 1', 3, 'water_1', 0, true, false, waterGroup);
        map.createFromObjects('Object Layer 1', 7, 'trees', 0, true, false, treeGroup);
        wallbrickGroup.setAll('body.immovable', true);
        waterGroup.setAll('body.immovable', true);
        waterGroup.setAll('alpha', 0.9);
        treeGroup.setAll('body.immovable', true);
        treeGroup.setAll("alpha", 0.8);
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
                    cooldown: 0.3
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
                    cooldown: 0.3
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
        );
        healthBarP2 = new HealthBarController(
            new Phaser.Point(650, 10),
            players[1]
        );


        //Button Quit



        //press ESC to pause or unpause
        pause_label = game.add.text(game.world.centerX, game.world.height - 30, 'PAUSE', {
            font: 'bold 30px Arial',
            fill: '#000'
        });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function() {
            // When the paus button is pressed, we pause the game
            game.paused = true;

            // Then add the menu
            menu = game.add.sprite(game.world.centerX, game.world.centerY, 'background-menu');
            menu.anchor.setTo(0.5, 0.5);

            // And a label to illustrate which menu item was chosen. (This is not necessary)


            choiseLabel = game.add.text(game.world.centerX - 220, game.world.centerY - 250, 'WAR OF TANKS', {
                font: "bold 60px Arial",
                fill: '#0040ff'
            });
            choiseLabel1 = game.add.text(game.world.centerX - 80, game.world.centerY - 150, 'Continue', {
                font: 'bold 40px Arial',
                fill: '#ff0000',

            });
            choiseLabel2 = game.add.text(game.world.centerX - 110, game.world.centerY - 50, 'Sound On/Off', {
                font: 'bold 40px Arial',
                fill: '#ff0000',
            });
            choiseLabel3 = game.add.text(game.world.centerX - 110, game.world.centerY + 50, 'Back to Menu', {
                font: 'bold 40px Arial',
                fill: '#ff0000'
            });

        });
        game.input.onDown.add(unpause, self);

        function unpause(event) {
            // Only act if paused
            if (game.paused) {
                // Calculate the corners of the menu
                var x1 = game.world.centerX - 120;
                var x2 = game.world.centerX + 130;
                var y1 = game.world.centerY - 150;
                var y2 = game.world.centerY + 90;

                // Check if the click was inside the menu
                if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                    // The choicemap is an array that will help us see which item was clicked
                    if (event.x > (x1 + 50) && event.x < x2 - 40 && event.y < (y1 + 60)) {
                        menu.destroy();
                        choiseLabel.destroy();
                        choiseLabel1.destroy();
                        choiseLabel2.destroy();
                        choiseLabel3.destroy();
                        game.paused = false;
                    }
                    if (event.y > y1 + 100 && event.y < y2 - 100) {

                    }
                    if (event.y > y1 + 200) {

                    }

                }


            }
        }


    },
    update: function(game) {
        game.physics.arcade.collide(player1Group, layer);
        game.physics.arcade.collide(player2Group, layer);
        game.physics.arcade.collide(player1Group, player2Group);
        game.physics.arcade.collide(player1Group, wallbrickGroup);
        game.physics.arcade.collide(player2Group, wallbrickGroup);
        game.physics.arcade.collide(player1Group, waterGroup);
        game.physics.arcade.collide(player2Group, waterGroup);
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
        );
        game.physics.arcade.overlap(
            bulletPlayer2Group,
            player1Group,
            onBullet2HitPlayer1
        );
        if(player1Death ==1){
          player1Death =0;
          this.state.start('Win2');

        }
        if(player2Death ==1){
          player2Death =0;
          this.state.start('Win1');

        }

    },
    render: function(game) {
        game.debug.body(players);
    },
    // win: function abc(){
    //   game.state.start("Win1");
    // }

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
        player2Death =1;
    }
}

function onBullet2HitPlayer1(bulletPlayer2Sprite, player1Sprite) {
    bulletPlayer2Sprite.kill();
    player1Sprite.damage(1);
    if (!player1Sprite.alive) {
        boom.play();
        player1Death =1;


    }
}
