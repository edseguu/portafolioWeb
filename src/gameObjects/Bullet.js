class Bullet extends Phaser.GameObjects.Image{
    constructor (scene){
        super(scene, 0, 0, 'bullet');
        scene.add.existing(this)

        this.speed = Phaser.Math.GetSpeed(400, 1);
    }



}