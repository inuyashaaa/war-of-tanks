class PlayerController {
    constructor(x, y, configs, spriteName, physicsGroup, game) {
        this.sprite = physicsGroup.create(x, y, spriteName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.animations.add('down', [0, 1, 2, 3], 5, true);
        this.sprite.animations.add('left', [4, 5, 6, 7], 5, true);
        this.sprite.animations.add('right', [8, 9, 10, 11], 5, true);
        this.sprite.animations.add('up', [12, 13, 14, 15], 5, true);
        this.sprite.body.collideWorldBounds = true;
        // this.sprite.body.setSize(29, 26, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.game = game;
        this.point = new Phaser.Point(0, -1);
        this.spriteName = spriteName;
        this.sprite.health = 1;
        this.item1 = false;
        this.item2 = false;
        this.angle = 0;
    }
    update() {

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        //Kiem tra an item1(Item tang toc)
        if (this.item1 && this.spriteName == "player1") {
            item1Group.forEach(function(item) {
                item.kill();
            });
            this.configs.speed = 200;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {
                this.configs.speed = 120;
            }, this);
        }
        if (this.item1 && this.spriteName == "player2") {
            item1Group.forEach(function(item) {
                item.kill();
            });
            this.configs.speed = 200;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {
                this.configs.speed = 120;
            }, this);
        }

        //Item 2. Nếu nguwoif chơi ăn được sẽ khiến đối phương không thể di chuyển trong 3s :))
        if (this.item2 && this.spriteName == "player2") {
            item2Group.forEach(function(item) {
                item.kill();
            });
            player1Group.forEach(function(ship) {
                ship.body.moves = false;
            }, this);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                player1Group.forEach(function(ship) {
                    ship.body.moves = true;
                }, this);
            }, this);
        }
        if (this.item2 && this.spriteName == "player1") {
            item2Group.forEach(function(item) {
                item.kill();
            });
            player2Group.forEach(function(ship) {
                ship.body.moves = false;
            }, this);
            this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                player2Group.forEach(function(ship) {
                    ship.body.moves = true;
                }, this);
            }, this);
        }


        if (keyboard.isDown(this.configs.up)) {
            this.angle = 0;
            this.sprite.animations.play('up');
            this.sprite.body.velocity.y = -this.configs.speed;
        } else if (keyboard.isDown(this.configs.down)) {
            this.angle = -180;
            this.sprite.animations.play('down');
            this.sprite.body.velocity.y = this.configs.speed;
        } else if (keyboard.isDown(this.configs.left)) {
            this.angle = -90;
            this.sprite.animations.play('left');
            this.sprite.body.velocity.x = -this.configs.speed;

        } else if (keyboard.isDown(this.configs.right)) {
            this.angle = 90;
            this.sprite.animations.play('right');
            this.sprite.body.velocity.x = this.configs.speed;
        }
        if (this.angle == -180) {
            this.point = new Phaser.Point(0, 1);
        } else if (this.angle == -90) {
            this.point = new Phaser.Point(-1, 0);
        } else if (this.angle == 90) {
            this.point = new Phaser.Point(1, 0);
        } else {
            this.point = new Phaser.Point(0, -1);
        }
        this.timeSinceLastFire += this.game.time.physicsElapsed;

        // Kiem tra xem nguoi choi co an phim ban dan hay khong va thuc hien ban dan
        if (keyboard.isDown(this.configs.fire) && this.sprite.alive) {
            this.tryFire();
        }

        this.item1 = this.game.physics.arcade.overlap(item1Group, this.sprite);
        this.item2 = this.game.physics.arcade.overlap(item2Group, this.sprite);
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
                this.angle
            );
        }

        if (this.spriteName == "player2") {
            new BulletPlayer2Controller(
                this.sprite.position,
                direction,
                this.angle
            );
        }
    }
}
