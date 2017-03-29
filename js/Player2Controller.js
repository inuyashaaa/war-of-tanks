class Player2Controller {
    constructor(x, y, configs) {
        this.sprite = player2Group.create(x, y, "player2");
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(32, 32, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;

    }

    update() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        //Thiet lap viec di chuyen cua tank
        if (keyboard.isDown(this.configs.up)) {
            this.sprite.angle = 0;
            this.sprite.body.velocity.y = -Player2Controller.TANK_SPEED;
        } else if (keyboard.isDown(this.configs.down)) {
            this.sprite.angle = 180;
            this.sprite.body.velocity.y = Player2Controller.TANK_SPEED;
        } else if (keyboard.isDown(this.configs.left)) {
            this.sprite.angle = -90;
            this.sprite.body.velocity.x = -Player2Controller.TANK_SPEED;
        } else if (keyboard.isDown(this.configs.right)) {
            this.sprite.angle = 90;
            this.sprite.body.velocity.x = Player2Controller.TANK_SPEED;
        } else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }

        this.timeSinceLastFire += Phaser.Time.physicsElapsed;

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
        this.createBullet(new Phaser.Point(0, -1));
        hit.play();
    }
    createBullet(direction) {
        new BulletController(
            this.sprite.position,
            direction
        );
    }
}

Player2Controller.TANK_SPEED = 200;
