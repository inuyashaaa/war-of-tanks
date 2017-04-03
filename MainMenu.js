MainMenu = function(game) {

};
var button;
var background;
var titleScreen;
MainMenu.prototype = {
    preload: function(game) {
        game.load.image('background', 'Assets/images/background-menu.png');
        game.load.image('button', 'Assets/images/start.png');
        game.load.image('howtoplay','Assets/images/howtoplay.png');
        game.load.image('about','Assets/images/About.png');
        game.load.audio('state1','Assets/sound/state1.mp3');
    },

    create: function(game) {
        state1 = game.add.audio('state1');
        state1.play();
        background = game.add.tileSprite(0, 0, 960, 640, 'background');

        // Tạo button start
        this.createButton(game, "", game.world.centerX -225, game.world.centerY - 120, 246, 89,
            function() {
              state1.stop();
                this.state.start("Preloader");
            });
        //Tạo button About

        this.createButton1(game, "", game.world.centerX - 200, game.world.centerY -5, 500, 115,
            function() {
              state1.stop();
                this.state.start("Howtoplay");
            });
        this.createButton2(game, "About", game.world.centerX - 221, game.world.centerY +114, 350, 95,
            function() {
              state1.stop();
                this.state.start("About");
            });
    },
    // Hàm tạo button
    createButton: function(game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

    },
    createButton1: function(game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'howtoplay', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

    },
    createButton2: function(game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'about', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

    }


};
