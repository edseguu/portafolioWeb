
export class MoveObject extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, key, startFrame, endFrame){
        super(scene, x, y, key)
        scene.add.existing(this)
        this.setOrigin(0.5, 0.5);

        this.anims.create({
            key: 'animaPlay',
            frames: this.anims.generateFrameNumbers(key, {start: startFrame, end: endFrame}),
            frameRate: 10,
            repeat: -1
        });

        this.play('animaPlay');
    }
}