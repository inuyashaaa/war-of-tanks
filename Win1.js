Win1 = function(game) {};
Win1.prototype = {
    preload: function(game) {
        game.load.image('background', 'Assets/images/over1.png');
        game.load.image('button', 'Assets/images/Restart.png');

    },

    create: function(game) {


        game.add.image(0, 0, 'background');
        // Tạo button Restart
      //353x80
        this.createButton(game, "", game.world.width- 170, game.world.height -180, 353, 80,
            function() {
                this.state.start("MainGame");
            });
        // Anh em có thể viết hướng dẫn vào dưới đây

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
            font: "80px 353px Arial",
            fill: "#ffffff",
            align: "center",

        });
        txt.anchor.setTo(0.5, 0.5);
    }
};
