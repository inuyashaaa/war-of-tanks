Preloader = function(game) {
    game.preloadBar = null;
};

Preloader.prototype = {
    preload: function(game) {
        //Tạo thanh Preload lúc đầu game
        game.preloadBar = game.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        game.preloadBar.anchor.setTo(0.5, 0.5);
        game.time.advancedTiming = true;
        game.load.setPreloadSprite(game.preloadBar);

        //Load Map bằng JSON
        game.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('wall_brick', 'assets/images/wall_brick.png');
        game.load.image('wall_steel', 'assets/images/wall_steel.png');
        game.load.image('water_1', 'assets/images/water_1.png');

        //Load player
        game.load.image('player1', 'assets/images/tank_player1_up_c0_t1_s3.png');
        game.load.image('player2', 'assets/images/tank_armor_up_c1_t2.png');
        game.load.image('bullet', 'assets/images/bullet_up.png');
        game.load.atlasJSONHash('assets', 'assets/assets.png', 'assets/assets.json');

        //Load âm thank
        game.load.audio('hit2','assets/sound/bullet_hit_2.ogg');
        game.load.audio('shot','assets/sound/bullet_shot.ogg');

    },

    create: function(game) {
        game.state.start('MainGame');
    }

};
