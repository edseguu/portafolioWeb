
import { MoveObject } from "../gameObjects/MoveObject.js";
import { GroupBullets } from "../gameObjects/GroupBullets.js";

export class BulletSpace extends Phaser.Scene {

	constructor() {
		super("BulletSpace");
	}
	
	preload() {
        this.load.pack('resource', 'assets/data/assets.json');
    }

	create() {

		this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);


		this.anims.create({
        	key: 'animaPlay', // El mismo nombre que usas en this.play('animaPlay')
        	frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: -1 }), // Ajusta los frames según tu spritesheet
        	frameRate: 15,
        	repeat: -1
    	});




		this.player = new MoveObject(this,200, 200, 'player', 0, -1).setScale(0.6)
		this.physics.add.existing(this.player);
		this.player.body.setCollideWorldBounds(true);

		this.bullets = new GroupBullets(this);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.time.addEvent({
            delay: 700, 
            callback: () => {
                this.bullets.fireBullet(this.player.x, this.player.y - 50);
            },
            loop: true
        });



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




		if (window.innerWidth > 1000) {
			this.player.setScale(0.6)
			this.bullets.children.each(bullet => {
            if (bullet.active) {
                bullet.setScale(0.5);
            }
        });

			
		}
		if (window.innerWidth < 1000) {
			this.player.setScale(1)
			this.bullets.children.each(bullet => {
            if (bullet.active) {
                bullet.setScale(0.7);
            }
        });
			
		}

	}
}

