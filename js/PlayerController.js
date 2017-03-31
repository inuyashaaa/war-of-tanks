class PlayerController {
    constructor(x, y, configs, spriteName, physicsGroup, game) {
        this.sprite = physicsGroup.create(x, y, spriteName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(32, 32, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.game = game;
        this.point = new Phaser.Point(0, -1);
    }
    update() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        //Thiet lap viec di chuyen cua tank
        if (keyboard.isDown(this.configs.up)) {
            this.sprite.angle = 0;
            this.sprite.body.velocity.y = -PlayerController.TANK_SPEED;
            this.point = new Phaser.Point(0, -1);
        } else if (keyboard.isDown(this.configs.down)) {
            this.sprite.angle = 180;
            this.sprite.body.velocity.y = PlayerController.TANK_SPEED;
            this.point = new Phaser.Point(0, 1);
        } else if (keyboard.isDown(this.configs.left)) {
            this.sprite.angle = -90;
            this.sprite.body.velocity.x = -PlayerController.TANK_SPEED;

        } else if (keyboard.isDown(this.configs.right)) {
            this.sprite.angle = 90;
            this.sprite.body.velocity.x = PlayerController.TANK_SPEED;

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
        }
    }
    fire() {
        if (this.sprite.angle == -180) {
            this.point = new Phaser.Point(0, 1);
        } else if (this.sprite.angle == -90) {
            this.point = new Phaser.Point(-1, 0);
        } else if (this.sprite.angle == 90) {
            this.point = new Phaser.Point(1, 0);
        } else {
            this.point = new Phaser.Point(0, -1);
        }
        this.createBullet(this.point);
    }
    createBullet(direction) {
        new BulletPlayer1Controller(
            this.sprite.position,
            direction,
            bulletPlayer1Group,
            'bullet'
        );
    }
}

PlayerController.TANK_SPEED = 100;
