//Thông tin về game
About = function(game) {

};
var button;
var background;
var titleScreen;
About.prototype = {
    preload: function(game) {
        game.load.image('background', 'Assets/images/background-about.png');
        game.load.image('button', 'Assets/images/back-about.png');

    },

    create: function(game) {
      // Anh em thấy background nào đẹp thì thay vào
        background = game.add.tileSprite(0, 0, 960, 640, 'background');

        // Tạo button Back 274x132
        this.createButton(game, "",game.world.width-167,game.world.height-115  , 274, 132,
            function() {
                this.state.start("MainMenu");
            });
            //Thông tin nhóm(còn thiếu)
          game.add.text(330,50, 'TANK OF WAR',{
            font:"40px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });
          game.add.text(320,150, 'WEB - GEN6 - CI',{
            font:"40px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });
          game.add.text(200,200, 'Game được phát triển bởi các thành viên:',{
            font:"30px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });
          game.add.text(250,250, '- Phạm Huy Mạnh(Mạnh mảnh mai)',{
            font:"30px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });
          game.add.text(250,300, '- Trần Quang Hải(Hải hôi háng)',{
            font:"30px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });
          game.add.text(250,350, '- Trịnh Văn Thắng(Thắng thối tha)',{
            font:"30px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });
          game.add.text(250,400, '- Lâm Văn Thư(...)',{
            font:"30px Comic Sans MS",
            fill:"#fff",
            align:"center"
          });

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
