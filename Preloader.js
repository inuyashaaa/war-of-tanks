Preloader = function(game) {};

Preloader.prototype = {
    preload: function(game) {
        //Tạo thanh Preload lúc đầu game
        game.time.advancedTiming = true;
        //Load Map bằng JSON
        game.load.tilemap('map', 'Assets/maps/map6.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('wall_brick', 'Assets/wall_bricks.png');
        game.load.image('wall_steel', 'Assets/images/wall_steel.png');
        game.load.image('water_1', 'Assets/waters.png');
        game.load.image('trees', 'Assets/treesss.png');
        game.load.image('depnhat', 'Assets/depnhat.png');
        game.load.image('basictiles', 'Assets/basictiles.png');
        game.load.image('set', 'Assets/set.gif');

        //Load player
        // game.load.image('player1', 'Assets/images/up3.png');
        game.load.spritesheet('player2', 'Assets/tank2.png', 31, 31);
        game.load.spritesheet('player1', 'Assets/tank1.png', 31, 31);
        game.load.image('bullet1', 'Assets/images/bullet1.png');
        game.load.image('bullet2', 'Assets/images/bullet2.png');
        game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');

        //load flag
        game.load.image('flag1', 'Assets/images/bang.png');
        game.load.image('flag2', 'Assets/images/bang2.png');

        //Load Item
        game.load.image('item1', "Assets/images/powerup_tank.png");
        game.load.image('item2', "Assets/images/powerup_timer.png");

        //Load âm thank
        game.load.audio('boom', 'Assets/sound/explosion_1.ogg');
        game.load.audio('hit2', 'Assets/sound/bullet_hit_2.ogg');
        game.load.audio('shot', 'Assets/sound/bullet_shot.ogg');
        game.load.audio('bullethitplayer', 'Assets/sound/bullethitplayer.m4a');
        game.load.audio('bulletshot', 'Assets/sound/bulletshot.mp3');
        game.load.audio('bullethitwall', 'Assets/sound/bullethitwall.mp3');
        game.load.audio("soundbackground", 'Assets/sound/soundbackground.mp3');
        game.load.audio("ahihi", 'Assets/sound/a_hi_hi.mp3');


        //Load background-menu
        game.load.image('background-pause','Assets/images/background-pause.png');
    },

    create: function(game) {
        game.state.start('MainGame');
    }

};
