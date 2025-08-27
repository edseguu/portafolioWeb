import { Bullet } from "./Bullet.js";


export class GroupBullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene, {
            classType: Bullet,
            runChildUpdate: true
        });
    }

    fireBullet(x, y) {
        const bullet = this.get(x, y, 'bullet');
        
        if (bullet) {
            bullet.fire(x, y);
        }
    }
}