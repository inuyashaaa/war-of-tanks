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
        // game.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map', 'assets/maps/map4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('wall_brick', 'assets/images/wall_brick.png');
        game.load.image('wall_steel', 'assets/images/wall_steel.png');
        game.load.image('water_1', 'assets/images/water_1.2.png');
        game.load.image('trees', 'assets/images/123.png');

        //Load player
        game.load.image('player1', 'assets/images/up3.png');
        game.load.image('player2', 'assets/images/up3_2.png');
        // game.load.spritesheet('boom_animation', 'assets/images/boom_animation.png', 32, 32);
        // game.load.spritesheet('tank_animation', 'assets/images/tank_animation.png', 32, 32);
        game.load.image('bullet1', 'assets/bullet1.png');
        game.load.image('bullet2', 'assets/bullet2.png');
        game.load.atlasJSONHash('assets', 'assets/assets.png', 'assets/assets.json');

        //load flag
        game.load.image('flag', 'assets/images/bang.png');

        //Load âm thank
        game.load.audio('boom', 'assets/sound/explosion_1.ogg');
        game.load.audio('hit2', 'assets/sound/bullet_hit_2.ogg');
        game.load.audio('shot', 'assets/sound/bullet_shot.ogg');

        //Load health
        // game.load.image('healthBar', 'assets/images/healthBar.png');
        // game.load.image('healthBarBG', 'assets/images/healthBarBG.png');
        //Load background-menu
        game.load.image('background-menu','assets/background-menu1.png');
    },

    create: function(game) {
        game.state.start('MainGame');
    }

};
