class PlayerController {
    constructor(x, y, configs, spriteName, physicsGroup, game) {
        this.sprite = physicsGroup.create(x, y, spriteName);
        // this.sprite.animations.add('up', [9,10,11], 10, true);
        // this.sprite.animations.add('down', [0,1,2], 10, true);
        // this.sprite.animations.add('left', [3,4,5], 10, true);
        // this.sprite.animations.add('right', [6,7,8], 10, true);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(26, 26, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.game = game;
        this.point = new Phaser.Point(0, -1);
        this.spriteName = spriteName;
        this.sprite.health = 1;
    }
    update() {

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        if (keyboard.isDown(this.configs.up)) {
            this.sprite.angle = 0;
            // this.sprite.animations.play('up');
            this.sprite.body.velocity.y = -PlayerController.TANK_SPEED;
        } else if (keyboard.isDown(this.configs.down)) {
            this.sprite.angle = -180;
            // this.sprite.animations.play('down');
            this.sprite.body.velocity.y = PlayerController.TANK_SPEED;
        } else if (keyboard.isDown(this.configs.left)) {
            this.sprite.angle = -90;
            // this.sprite.animations.play('left');
            this.sprite.body.velocity.x = -PlayerController.TANK_SPEED;

        } else if (keyboard.isDown(this.configs.right)) {
            this.sprite.angle = 90;
            // this.sprite.animations.play('right');
            this.sprite.body.velocity.x = PlayerController.TANK_SPEED;
        }
        if (this.sprite.angle == -180) {
            this.point = new Phaser.Point(0, 1);
        } else if (this.sprite.angle == -90) {
            this.point = new Phaser.Point(-1, 0);
        } else if (this.sprite.angle == 90) {
            this.point = new Phaser.Point(1, 0);
        } else {
            this.point = new Phaser.Point(0, -1);
        }
        this.timeSinceLastFire += this.game.time.physicsElapsed;

        // Kiem tra xem nguoi choi co an phim ban dan hay khong va thuc hien ban dan
        if (keyboard.isDown(this.configs.fire)) {
            this.tryFire();
        }
    }

    tryFire() {
        if (this.timeSinceLastFire >= this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
            bulletshot.play();
        }
    }
    fire() {
        this.createBullet(this.point);
    }
    createBullet(direction) {
        if (this.spriteName == "player1") {
            new BulletPlayer1Controller(
                this.sprite.position,
                direction,
                this.sprite.angle
            );
        }

        if (this.spriteName == "player2") {
            new BulletPlayer2Controller(
                this.sprite.position,
                direction,
                this.sprite.angle
            );
        }
    }
}

PlayerController.TANK_SPEED = 120;
