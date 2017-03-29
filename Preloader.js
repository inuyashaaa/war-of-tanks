Game.Preloader = function(game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function() {
        //Tạo thanh Preload lúc đầu game
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);

        //Load Map bằng JSON
        this.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('wall_brick', 'assets/images/wall_brick.png');
        this.load.image('wall_steel', 'assets/images/wall_steel.png');

        //Load player
        this.load.image('player1', 'assets/images/tank_player1_up_c0_t1_s3.png');
        this.load.image('player2', 'assets/images/tank_armor_up_c1_t2.png');
    },

    create: function() {
        this.state.start('MainGame');
    }

};
