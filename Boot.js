Boot = function(game) {

};

Boot.prototype = {
    init: function(game) {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true; //Về xem thêm
    },
    preloader: function(game) {
        game.load.image('preloaderBar', 'assets/preloader.png');
    },
    create: function(game) {
        game.state.start('Preloader');
    }
};
