MainGame = function(game) {};

var map;
var layer;
var layer2;
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

//Group item
var item1Group;
var item2Group;
var player1Death = 0;
var player2Death = 0;
//Âm thanh
var checkSound = true;

var flag1;
var flag2;
var menu;
var tank1Flag = 0;
var tank2Flag = 0;
var back_menu = 0;
var sound = true;

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
        map.addTilesetImage('depnhat', 'depnhat');
        map.addTilesetImage('basictiles', 'basictiles');
        map.addTilesetImage('set', 'set');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();


        // map.setCollisionBetween(15,16);
        map.setCollision([15, 16, 375, 406, 422, 435], true);

        //Tạo group cho gạch
        wallbrickGroup = game.add.group();
        wallbrickGroup.enableBody = true;

        waterGroup = game.add.group();
        waterGroup.enableBody = true;

        //Tạo Group đạn
        bulletPlayer1Group = game.add.physicsGroup();
        bulletPlayer2Group = game.add.physicsGroup();

        //Tạo Group player
        player1Group = game.add.physicsGroup();
        player2Group = game.add.physicsGroup();

        //Group
        flag1 = game.add.physicsGroup();
        flag2 = game.add.physicsGroup();

        //Tạo group cho nước

        treeGroup = game.add.group();
        treeGroup.enableBody = true;

        //Group item
        item1Group = game.add.physicsGroup();
        item2Group = game.add.physicsGroup();

        //Tạo map từ Object trong tilemap và chuyển chúng vào group tương ứng
        map.createFromObjects('Object Layer 1', 815, 'wall_brick', 0, true, false, wallbrickGroup);
        map.createFromObjects('Object Layer 1', 691, 'water_1', 0, true, false, waterGroup);
        map.createFromObjects('Object Layer 1', 17, 'trees', 0, true, false, treeGroup);
        wallbrickGroup.setAll('body.immovable', true);
        waterGroup.setAll('body.immovable', true);
        waterGroup.setAll('alpha', 0.9);
        treeGroup.setAll('body.immovable', true);
        treeGroup.setAll("alpha", 0.9);
        //Tạo âm thanh

        hit2 = game.add.audio('hit2');
        shot = game.add.audio('shot');
        boom = game.add.audio('boom');
        bullethitplayer = game.add.audio('bullethitplayer');
        bulletshot = game.add.audio('bulletshot');
        bullethitwall = game.add.audio('bullethitwall');
        soundbackground = game.add.audio('soundbackground');
        ahihi = game.add.audio('ahihi');
        soundbackground.volume = 0.3;
        soundbackground.play('', 0, 0.3, true, true);


        //flag
        flag1.create(904, 584, 'flag1');
        flag1.enableBody = true;
        flag2.create(24, 584, 'flag2');
        flag2.enableBody = true;

        //Tao item
        game.time.events.add(Phaser.Timer.SECOND * 12, function() {
            item1Group.create(462, 276, 'item1');
            item1Group.enableBody = true;
        });
        game.time.events.add(Phaser.Timer.SECOND * 70, function() {
            item1Group.create(318, 308, 'item1');
            item1Group.enableBody = true;
        });
        game.time.events.add(Phaser.Timer.SECOND * 160, function() {
            item1Group.create(462, 276, 'item1');
            item1Group.enableBody = true;
        });
        game.time.events.add(Phaser.Timer.SECOND * 40, function() {
            item2Group.create(462, 388, 'item2');
            item2Group.enableBody = true;
        });
        game.time.events.add(Phaser.Timer.SECOND * 110, function() {
            item2Group.create(750, 580, 'item2');
            item2Group.enableBody = true;
        });
        //Tao mang de luu nguoi choi
        players = [];
        players.push(
            new Player1Controller(
                40,
                40, {
                    up: Phaser.Keyboard.W,
                    down: Phaser.Keyboard.S,
                    left: Phaser.Keyboard.A,
                    right: Phaser.Keyboard.D,
                    fire: Phaser.Keyboard.SPACEBAR,
                    cooldown: 0.25,
                    speed: 120
                },
                game
            )
        );
        players.push(
            new Player2Controller(
                920,
                40, {
                    up: Phaser.Keyboard.UP,
                    down: Phaser.Keyboard.DOWN,
                    left: Phaser.Keyboard.LEFT,
                    right: Phaser.Keyboard.RIGHT,
                    fire: Phaser.Keyboard.ENTER,
                    cooldown: 0.25,
                    speed: 120
                },
                game
            )
        );

        //press ESC to pause or unpause
        pause_label = game.add.text(game.world.centerX - 50, game.world.height - 40, 'PAUSE', {
            font: 'bold 35px Comic Sans MS',
            fill: '#000'
        });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function() {
            // When the paus button is pressed, we pause the game
            game.paused = true;

            // Then add the menu
            menu = game.add.sprite(game.world.centerX, game.world.centerY, 'background-pause');
            menu.anchor.setTo(0.5, 0.5);

            continues = game.add.text(game.world.centerX - 310, game.world.centerY - 150, 'CONTINUE', {
                font: 'bold 40px Algerian',
                fill: '#fff',

            });
            restart = game.add.text(game.world.centerX - 310, game.world.centerY - 50, 'RESTART ', {
                font: 'bold 40px Algerian',
                fill: '#fff',
            });
            backToMenu = game.add.text(game.world.centerX - 350, game.world.centerY + 50, 'BACK TO MENU', {
                font: 'bold 40px Algerian',
                fill: '#fff'
            });


        });
        game.input.onDown.add(choose, self);

        function choose(event) {
            // Only act if paused
            if (game.paused) {
                // Calculate the corners of the menu
                var x1 = game.world.centerX - 350;
                var x2 = game.world.centerX - 50;
                var y1 = game.world.centerY - 150;
                var y2 = game.world.centerY + 90;

                // Check if the click was inside the menu
                if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {

                    if (event.x > (x1 + 50) && event.x < x2 - 80 && event.y < (y1 + 40)) {
                        menu.destroy();
                        // choiseLabel.destroy();
                        backToMenu.destroy();
                        continues.destroy();
                        restart.destroy();
                        game.paused = false;
                    }
                    if (event.y > y1 + 100 && event.y < y2 - 50) {
                        backToMenu.destroy();
                        continues.destroy();
                        restart.destroy();
                        game.paused = false;
                        game.state.start("MainGame");
                    }
                    if (event.y > y1 + 200) {
                        menu.destroy();
                        continues.destroy();
                        backToMenu.destroy();
                        restart.destroy();
                        game.paused = false;
                        back_menu = 1;
                    }

                }

            }
        }
        window.onkeydown = function(event) {
            if (event.keyCode == "K".charCodeAt(0)) {
                sound = !sound;
            }
        };

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

        if (tank1Flag >= 2) {
            tank1Flag = 0;
            game.state.start('Win1');
        }
        if (tank2Flag >= 2) {
            tank2Flag = 0;
            game.state.start('Win2');
        }
        if (player1Death == 1) {
            player1Death = 0;
            game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                player1Group.forEach(function(ship) {
                    ship.reset(40, 40);
                });
            });
            if (tank1Flag == 1) {
                flag1.forEach(function(ship) {
                    ship.reset(896, 580);
                });
                tank1Flag = 0;
            }
        }

        if (player2Death == 1) {
            player2Death = 0;
            game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                player2Group.forEach(function(ship) {
                    ship.reset(920, 40);
                });
            });
            if (tank2Flag == 1) {

                flag2.forEach(function(ship) {
                    ship.reset(32, 580);
                });
                tank2Flag = 0;
            }
        }
        if (back_menu == 1) {
            back_menu = 0;
            this.state.start("MainMenu");
        }
        game.physics.arcade.overlap(flag1, player1Group, tank1TakeFlag);
        game.physics.arcade.overlap(flag2, player2Group, tank2TakeFlag);

    },
    render: function(game) {
        game.debug.body(players);
    },

};

function onBulletHitWallBrick(bulletPlayerGroup, wallbrickGroup) {
    bulletPlayerGroup.kill();
    wallbrickGroup.kill();
    if (sound)
        bullethitwall.play();
}

function onBulletHitLayer(bulletPlayerGroup, layer) {
    bulletPlayerGroup.kill();
    if (sound)
        bullethitwall.play();
}

function onBullet1HitPlayer2(bulletPlayer1Sprite, player2Sprite) {
    bulletPlayer1Sprite.kill();
    player2Sprite.damage(1);
    if (!player2Sprite.alive) {
        player2Death = 1;
        if (sound)
            bullethitplayer.play();
    }
}

function onBullet2HitPlayer1(bulletPlayer2Sprite, player1Sprite) {
    bulletPlayer2Sprite.kill();
    player1Sprite.kill();
    if (!player1Sprite.alive) {

        player1Death = 1;
        if (sound)
            bullethitplayer.play();
    }
}

function tank1TakeFlag(flag1, player1Group) {
    ahihi.play();
    flag1.kill();
    tank1Flag += 1;
    flag1.reset(23, 24);
}

function tank2TakeFlag(flag2, player2Group) {
    ahihi.play();
    flag2.kill();
    tank2Flag += 1;
    flag2.reset(906, 22);
}
