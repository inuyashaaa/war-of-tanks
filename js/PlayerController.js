class PlayerController {
    constructor(x, y, configs, spriteName, physicsGroup, game) {
        this.sprite = physicsGroup.create(x, y, spriteName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(26, 26, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.game = game;
        this.point = new Phaser.Point(0, -1);
        this.spriteName = spriteName;
        this.sprite.health = 1;
        this.item1 = false;
    }
    update() {

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        //Kiem tra an item1(Item tang toc)
        if (this.item1 && this.spriteName == "player1") {
            itemGroup.forEach(function(item) {
                item.kill();
            });
            this.configs.speed = 200;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {
                this.configs.speed = 120;
            }, this);
        }
        if (this.item1 && this.spriteName == "player2") {
            itemGroup.forEach(function(item) {
                item.kill();
            });
            this.configs.speed = 200;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {
                this.configs.speed = 120;
            }, this);
        }
        if (keyboard.isDown(this.configs.up)) {
            this.sprite.angle = 0;
            // this.sprite.animations.play('up');
            this.sprite.body.velocity.y = -this.configs.speed;
        } else if (keyboard.isDown(this.configs.down)) {
            this.sprite.angle = -180;
            // this.sprite.animations.play('down');
            this.sprite.body.velocity.y = this.configs.speed;
        } else if (keyboard.isDown(this.configs.left)) {
            this.sprite.angle = -90;
            // this.sprite.animations.play('left');
            this.sprite.body.velocity.x = -this.configs.speed;

        } else if (keyboard.isDown(this.configs.right)) {
            this.sprite.angle = 90;
            // this.sprite.animations.play('right');
            this.sprite.body.velocity.x = this.configs.speed;
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
        if (keyboard.isDown(this.configs.fire) && this.sprite.alive) {
            this.tryFire();
        }

        this.item1 = this.game.physics.arcade.overlap(itemGroup, this.sprite);
    }

    tryFire() {
        if (this.timeSinceLastFire >= this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
            if (sound)
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
