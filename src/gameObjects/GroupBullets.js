import { Bullet } from "./Bullet.js";


export class GroupBullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene, {
            classType: Bullet,
            runChildUpdate: true,
            createCallback: (bullet) => {
                bullet.setVisible(false);
                bullet.setActive(false);
            }
        });
    }

    fireBullet(x, y) {
        const bullet = this.get();
        if (bullet) {
            bullet.body.reset(x, y);
            bullet.setVisible(false);
            bullet.setActive(false);
            bullet.fire(x, y); 
            }
        }
}