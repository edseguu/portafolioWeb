export class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor (scene){
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


        this.setVelocityY(-1300);//Set de Velocidad de bullet de player
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