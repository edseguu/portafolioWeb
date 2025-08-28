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

		this.boss = this.add.sprite(innerWidth / 2, 200, 'boss').setScale(0.5)
		this.physics.add.existing(this.boss);
		this.boss.body.setImmovable(true);

		this.boss.bloomEffect = this.boss.postFX.addBloom();


		
		
		this.anims.create({
			key: 'animaPlay', // El mismo nombre que usas en this.play('animaPlay')
        	frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: -1 }), // Ajusta los frames según tu spritesheet
        	frameRate: 15,
        	repeat: -1
    	});
		
		
		
		
		this.player = new MoveObject(this,innerWidth /2, 900, 'player', 0, -1).setScale(0.6)
		this.physics.add.existing(this.player);
		this.player.body.setCollideWorldBounds(true);
		
		this.bullets = new GroupBullets(this);
		this.physics.add.collider(this.player, this.boss);
		this.physics.add.collider(this.bullets, this.boss, this.bulletHitBoss, null, this);
		
		
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



		this.physics.add.collider(
			this.player,
			this.boss,
			(player, boss) => {
			}
		);

		this.bossLife = 100;
		this.bossLifeText = this.add.text(20, 20, 'Boss Vida: ' + this.bossLife, { fontSize: '32px', fill: '#fff' });
		this.bossSpeedX = 6; // velocidad del boss en X
	}


	bulletHitBoss(boss, bullet) {
		bullet.setActive(false);
		bullet.setVisible(false);
		bullet.body.reset(-100, -100); // Mueve la bala fuera de la vista para reciclarla

		// Resta vida al boss
		this.bossLife = Math.max(0, this.bossLife - 1);
		this.bossLifeText.setText('Boss Vida: ' + this.bossLife);


    // Obtiene el efecto de bloom del jefe.
    const bloomEffect = boss.bloomEffect;
    if (bloomEffect) {
        bloomEffect.strength = 0.7;
        bloomEffect.color = 0xffa500;

        // Temporizador para resetear el efecto.
        this.time.delayedCall(250, () => {
            bloomEffect.strength = 0;
        });
    }
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
                bullet.setScale(0.5);
            }
        });
			
		}

		// Movimiento automático del boss en eje X
		if (this.boss) {
			if (this.bossLife < 60) {
				this.bossSpeedX = this.bossSpeedX < 0 ? -9: 9;
			} else {
				this.bossSpeedX = this.bossSpeedX < 0 ? -6 : 6;
			}
			this.boss.x += this.bossSpeedX;
			// Rebote en los bordes usando displayWidth
			const bossHalfWidth = this.boss.displayWidth / 2;
			if (this.boss.x <= bossHalfWidth) {
				this.boss.x = bossHalfWidth;
				this.bossSpeedX *= -1;
			}
			if (this.boss.x >= this.scale.width - bossHalfWidth) {
				this.boss.x = this.scale.width - bossHalfWidth;
				this.bossSpeedX *= -1;
			}
		}

	}
}

