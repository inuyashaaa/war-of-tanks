Howtoplay = function(game) {

};
var button;
var background;
var titleScreen;
Howtoplay.prototype = {
    preload: function(game) {
        game.load.image('background', 'assets/background-howtoplay.png');
        game.load.image('button', 'assets/button1.png');

    },

    create: function(game) {


      game.add.image(0,0, 'background');
        // Tạo button Comback
        this.createButton(game, "Comback", 875, 615, 170, 55,
            function() {
                this.state.start("MainMenu");
            });
            // Anh em có thể viết hướng dẫn vào dưới đây
        game.add.text(150, 100, 'HƯỚNG DẪN VÀ PHÍM ĐIỀN KHIỂN', {
            font: '35px Arial',
            fill: '#ff00ff',
            align: 'center'
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
