Boot = function(game) {

};

Boot.prototype = {
    init: function(game) {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true; //Về xem thêm
    },
    preloader: function(game) {},
    create: function(game) {
        game.scale.minWidth = 800;
        game.scale.minHeight = 600;
        game.scale.maxWidth = 960;
        game.scale.maxHeight = 640;
        game.scale.pageAlignHorizontally = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.state.start('MainMenu');
    }
};
