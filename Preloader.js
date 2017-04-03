Preloader = function(game) {};

Preloader.prototype = {
    preload: function(game) {
        //Tạo thanh Preload lúc đầu game
        game.time.advancedTiming = true;

        //Load Map bằng JSON
        // game.load.tilemap('map', 'assets/maps/map4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map', 'assets/maps/map6.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('wall_brick', 'assets/wall_bricks.png');
        game.load.image('wall_steel', 'assets/images/wall_steel.png');
        game.load.image('water_1', 'assets/waters.png');
        game.load.image('trees', 'assets/treesss.png');
        game.load.image('depnhat', 'assets/depnhat.png');
        game.load.image('basictiles', 'assets/basictiles.png');
        game.load.image('set', 'assets/set.gif');

        //Load player
        game.load.image('player1', 'assets/images/up3.png');
        game.load.image('player2', 'assets/images/up3_2.png');
        // game.load.spritesheet('boom_animation', 'assets/images/boom_animation.png', 32, 32);
        // game.load.spritesheet('tank_animation', 'assets/images/tank_animation.png', 32, 32);
        game.load.image('bullet1', 'assets/images/bullet1.png');
        game.load.image('bullet2', 'assets/images/bullet2.png');
        game.load.atlasJSONHash('assets', 'assets/assets.png', 'assets/assets.json');

        //load flag
        game.load.image('flag1', 'assets/images/bang.png');
        game.load.image('flag2', 'assets/images/bang2.png');

        //Load âm thank
        game.load.audio('boom', 'assets/sound/explosion_1.ogg');
        game.load.audio('hit2', 'assets/sound/bullet_hit_2.ogg');
        game.load.audio('shot', 'assets/sound/bullet_shot.ogg');
        game.load.audio('bullethitplayer', 'assets/sound/bullethitplayer.m4a');
        game.load.audio('bulletshot', 'assets/sound/bulletshot.mp3');
        game.load.audio('bullethitwall', 'assets/sound/bullethitwall.mp3');
        game.load.audio("soundbackground", 'assets/sound/soundbackground.mp3');


        //Load background-menu
        game.load.image('background-pause','assets/images/background-pause.png');
    },

    create: function(game) {
        game.state.start('MainGame');
    }

};
