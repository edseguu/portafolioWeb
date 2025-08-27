
import { MoveObject } from "../gameObjects/MoveObject.js";

export class BulletSpace extends Phaser.Scene {

	constructor() {
		super("BulletSpace");
	}
	
	preload() {
        this.load.pack('resource', 'assets/data/assets.json');
    }

	create() {

		this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);


		this.player = new MoveObject(this,200, 200, 'player', 0, -1).setScale(0.6)
		this.physics.add.existing(this.player);


		this.cursors = this.input.keyboard.createCursorKeys();
		this.player.body.setCollideWorldBounds(true);


		this.input.setDraggable(this.player.setInteractive());

		this.input.on('dragstart', (pointer, obj) =>
        {
            obj.body.moves = false;
        });

        this.input.on('drag', (pointer, obj, dragX, dragY) =>
        {
            obj.setPosition(dragX, dragY);
        });

        this.input.on('dragend', (pointer, obj) =>
        {
            obj.body.moves = true;
        });
	}

	update(){

		this.player.body.setVelocity(0);

		if(this.cursors.left.isDown){
			this.player.body.setVelocityX(-300);
        }else if(this.cursors.right.isDown){
            this.player.body.setVelocityX(300);
        }

		if (this.cursors.up.isDown){
            this.player.body.setVelocityY(-300);
        }else if (this.cursors.down.isDown){
            this.player.body.setVelocityY(300);
        }



		if (window.innerWidth < 1000) {
			this.player.setScale(1)
			
		}

	}
}

/* END OF COMPILED CODE */

// You can write more code here
