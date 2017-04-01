class HealthBarController {
  constructor(healthBarPosition, fatherObject) {
    this.fatherObject = fatherObject;
    this.healthBar = healthBarGroup.create(healthBarPosition.x, healthBarPosition.y, 'healthBar');
    this.healthBarBG = healthBarGroup.create(healthBarPosition.x+3, healthBarPosition.y+3, 'healthBarBG');
    this.healthBarBG.scale.setTo(0, 0.5);
  }

  remove() {
    if (!this.fatherObject.sprite.health) {
      this.healthBar.kill();
      this.healthBarBG.kill();
    }
  }

  update() {
    // console.log(this.fatherObject.sprite.health);
    this.healthBarBG.scale.setTo(this.fatherObject.sprite.health / 10, 1);
    this.remove();
  }
}
