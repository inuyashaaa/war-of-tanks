Howtoplay = function(game) {

};
var button;
var background;
var titleScreen;
Howtoplay.prototype = {
    preload: function(game) {
        game.load.image('background', 'assets/howtoplay-background.png');
        game.load.image('button1', 'assets/back-howtoplay.png');

    },

    create: function(game) {


      game.add.image(0,0, 'background');
        // Tạo button Back 222x89
        this.createButton(game, "", game.world.width-129, game.world.height-89, 222, 89,
            function() {
                this.state.start("MainMenu");
            });
            // Anh em có thể viết hướng dẫn vào dưới đây
        game.add.text(100, 20, 'HƯỚNG DẪN VÀ PHÍM ĐIỀN KHIỂN', {
            font: '45px Comic Sans MS',
            fill: '#fff',
            align: 'center'
        });
        game.add.text(100, 80, 'GIỚI THIỆU: Để thỏa mãn sư yêu thích với game huyền thoại một thời, cộng thêm ', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 110, 'yếu tố chiến thuật, thể hiện trình độ PK tuyệt đỉnh thì chúng ta sẽ đến với game War Of Tanks.', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(100, 170, 'LUẬT CHƠI: Nhiệm vụ của người chơi là đến vị trí và lấy cờ và quay trở lại vị trí ban', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 200, 'đầu để cắm cờ giành chiến thắng. Trong quá trình chơi, hai người chơi có thể cản trở,', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 230, 'tiêu diệt nhau. Nếu chết, người chơi sẽ được hồi sinh sau hai giây. Hãy cố gắng kiếm thật', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 260, 'nhiều Item trong quãng đường di chuyển để giành lợi thế và đến với cờ nhanh hơn.', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 320, 'PHÍM: Player 1: A : sang trái         Player 2: LEFT: sang trái', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 350,'                         D : sang phải                       RIGHT: sang phải', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 380,'                         W : đi lên                            UP: đi lên', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 410,'                         S : đi xuống                         DOWN: đi xuống', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });
        game.add.text(70, 440,'                         SPACEBAR : bắn                  0: bắn', {
            font: '20px Comic Sans MS',
            fill: '#fff',
            align: 'left'
        });

        // titleScreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titleScreen');
        // titleScreen.anchor.setTo(0.5, 0.5);
    },
    // Hàm tạo button
    createButton: function(game, string, x, y, w, h, callback) {
        var button1 = game.add.button(x, y, 'button1', callback, this, 2, 1, 0);
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
