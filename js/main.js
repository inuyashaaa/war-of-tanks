var Tank = {};

Tank.configs = {
    GAME_WIDTH: 800,
    GAME_HIGHT: 600
};
window.onload = function() {
    Tank.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });
};

function preload() {

    Tank.game.load.image('sky', 'assets/sky.png');
}

function create() {


    //Khoi dong che do physics
    Tank.game.physics.startSystem(Phaser.Physics.ARCADE);

    Tank.game.add.sprite(0, 0, 'sky');
}

function update() {

}
