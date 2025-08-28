


export class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y, texture){
        super(scene, 0, 0, 'bullet');
        scene.add.existing(this)

        this.speed = Phaser.Math.GetSpeed(400, 1);
        this.setActive(false);
        this.setVisible(false);
    }


    fire (x, y){

        this.body.reset(x, y); 
        this.setActive(true);
        this.setVisible(true);
        // This is the crucial line that gives the bullet its velocity
        this.setVelocityY(-700);

        this.play('animaPlay');
    }

    update(time, delta) {
        // La lógica para desactivar la bala cuando sale de la pantalla
        if (this.y <= 0 - this.height) {
            this.setActive(false);
            this.setVisible(false);
        }
    }


}