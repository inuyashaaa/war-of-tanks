class BulletController {
    constructor(position, direction, physicsGroup, spriteName, angle) {
        this.sprite = physicsGroup.create(position.x, position.y, spriteName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.setSize(18, 18);
        this.sprite.angle = angle;
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);
        bullets.push(this);
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

BulletController.BULLET_SPEED = 320;
