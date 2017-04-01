MainMenu = function(game) {

};
var button;
var background;
var titleScreen;
MainMenu.prototype = {
    preload: function(game) {
        game.load.image('background', 'assets/background-menu.png');
        game.load.image('button', 'assets/start.png');
    },

    create: function(game) {

        background = game.add.tileSprite(0, 0, 960, 640, 'background');

        // Tạo button start
        this.createButton(game, "", game.world.centerX -225, game.world.centerY - 120, 246, 89,
            function() {
                this.state.start("Preloader");
            });
        //Tạo button About
        this.createButton(game, "How to play", game.world.centerX + 10, game.world.centerY - 20, 220, 50,
            function() {
                this.state.start("Howtoplay");
            });
        this.createButton(game, "About", game.world.centerX + 10, game.world.centerY +70, 110, 50,
            function() {
                this.state.start("About");
            });
        // titleScreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titleScreen');
        // titleScreen.anchor.setTo(0.5, 0.5);
    },
    // Hàm tạo button
    createButton: function(game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;
        var txt = game.add.text(button1.x, button1.y, string, {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",

        });
        txt.anchor.setTo(0.5, 0.5);
    }
};
