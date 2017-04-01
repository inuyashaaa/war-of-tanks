Boot = function(game) {

};

Boot.prototype = {
    init: function(game) {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true; //Về xem thêm
    },
    preloader: function(game) {
    },
    create: function(game) {

        game.state.start('MainMenu');
    }
};
