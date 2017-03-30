class BulletPlayer1Controller {
    constructor(position, direction, bulletName, angle) {

        // this.sprite = bulletPlayer1Group.create(position.x, position.y, 'assets', 'BulletType2.png');
        this.sprite = bulletPlayer1Group.create(position.x, position.y, 'bullet');
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.setSize(16, 16);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.angle = angle;
        this.sprite.angleOffset = 90;
        this.sprite.body.velocity = direction.setMagnitude(BulletPlayer1Controller.BULLET_SPEED);
        bullets.push(this);
        this.sprite.oneKilled = this.oneKilled;
    }

    update() {
        if (!this.sprite.alive) {
            var index = bullets.indexOf(this);
            if (index != -1) {
                bullets.splice(index, 1);
            }
        }
    }
}

BulletPlayer1Controller.BULLET_SPEED = 250;
