import { MoveObject } from "../gameObjects/MoveObject.js";
import { GroupBullets } from "../gameObjects/GroupBullets.js";
import { BulletEnemy } from "../gameObjects/BulletEnemy.js";


export class BulletSpace extends Phaser.Scene {

	constructor() {
		super("BulletSpace");
	}
	
	preload() {
        this.load.pack('resource', 'assets/data/assets.json');
    }

	create() {

		this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);

		this.boss = new MoveObject(this, this.scale.width / 2, 200, 'boss', 0, -1).setScale(0.5)
		this.physics.add.existing(this.boss);
		this.boss.body.setImmovable(true);

		this.boss.bloomEffect = this.boss.postFX.addBloom();


		
		
		this.anims.create({
			key: 'animaPlay', // El mismo nombre que usas en this.play('animaPlay')
        	frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: -1 }), // Ajusta los frames según tu spritesheet
        	frameRate: 15,
        	repeat: -1
    	});
		
		// Animación para las balas enemigas
    	this.anims.create({
            key: 'animaPlayEnemy', // Animación para bulletEnemy
            frames: this.anims.generateFrameNumbers('bulletEnemy', { start: 0, end: -1 }), // Usa todos los frames
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
            delay: 400, 
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

		// Grupo de balas enemigas
		const isSmallScreen = window.innerWidth < 900 && window.innerWidth > 200;
		this.enemyBullets = this.physics.add.group({
			classType: BulletEnemy,
			runChildUpdate: true,
			maxSize: isSmallScreen ? 5 : 20
		});

		// Temporizador para disparar desde el boss hacia el player
		this.bossShootDelay = isSmallScreen ? 2000 : 850;
		this.bossShootEvent = this.time.addEvent({
			delay: this.bossShootDelay,
			loop: true,
			callback: () => {
				const bullet = this.enemyBullets.get();
				if (bullet) {
					const randomScale = 0.5 + Math.random() * 0.5;
					bullet.setScale(randomScale);
					if (isSmallScreen) {
						bullet.fire(this.boss.x, this.boss.y + this.boss.displayHeight / 2, this.player.x, this.player.y, 120);
					} else {
						bullet.fire(this.boss.x, this.boss.y + this.boss.displayHeight / 2, this.player.x, this.player.y);
					}
				}
			}
		});
		
		// Colisión entre balas del player y balas enemy
		this.physics.add.collider(
			this.bullets,
			this.enemyBullets,
			null, // collideCallback
			(playerBullet, enemyBullet) => {
				// Solo procesar si ambas están activas
				if (playerBullet.active && enemyBullet.active) {
					playerBullet.setActive(false);
					playerBullet.setVisible(false);
					enemyBullet.setActive(false);
					enemyBullet.setVisible(false);
					return true; // Solo una colisión por frame
				}
				return false;
			},
			this
		);

		// Colisión entre balas enemy y el player
    	this.physics.add.collider(this.enemyBullets, this.player, (enemyBullet, player) => {
        	if (enemyBullet.active && player.active) {
            	enemyBullet.setActive(false);
            	enemyBullet.setVisible(false);
            	this.gameOver();
        	}
    	});
    	// Colisión entre player y boss
    	this.physics.add.collider(this.player, this.boss, (player, boss) => {
        	if (player.active && boss.active) {
            	this.gameOver();
        	}
    	});
		
		this.laserGroup = this.add.group();
		this.time.addEvent({
			delay: 3000,
			loop: true,
			callback: () => {
				// Activa el bloom antes de disparar el láser
				if (this.boss && this.boss.bloomEffect) {
					this.boss.bloomEffect.strength = 1.2;
					this.boss.bloomEffect.color = 0x00aaff;
				}
				this.time.delayedCall(200, () => {
					this.fireBossLaser();
				});
			}
		});



	}


	fireBossLaser() {
		const laser = this.add.graphics();
		laser.alpha = 0;
		laser.lineStyle(20, 0x00aaff, 1);
		laser.beginPath();
		laser.moveTo(this.boss.x, this.boss.y + this.boss.displayHeight / 2);
		laser.lineTo(this.boss.x, this.scale.height);
		laser.strokePath();
		laser.closePath();
		this.laserGroup.add(laser);
		laser.laserX = this.boss.x;
		laser.laserY1 = this.boss.y + this.boss.displayHeight / 2;
		laser.laserY2 = this.scale.height;
		// Fade in
		this.tweens.add({
			targets: laser,
			alpha: 1,
			duration: 0,
			ease: 'Linear',
			onComplete: () => {
				// Fade out después de 300ms visible
				this.tweens.add({
					targets: laser,
					alpha: 0,
					duration: 800,
					ease: 'Linear',
					onComplete: () => {
						laser.destroy();
						// Quita el bloom del boss
						if (this.boss && this.boss.bloomEffect) {
							this.boss.bloomEffect.strength = 0;
						}
					}
				});
			}
		});
		laser.active = true;
		this.laserActive = laser;
	}

	bulletHitBoss(boss, bullet) {
		bullet.setActive(false);
		bullet.setVisible(false);
		bullet.body.reset(-100, -100); // Mueve la bala fuera de la vista para reciclarla

		// Resta vida al boss
		this.bossLife = Math.max(0, this.bossLife - 1);
		this.bossLifeText.setText('Boss Vida: ' + this.bossLife);

		if (this.bossLife === 0) {
			this.scene.stop('BulletSpace');
			this.scene.start('Start');
			return;
		}

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

	gameOver() {
		// Detiene la escena y lanza GameOverScene correctamente
		this.scene.stop('BulletSpace');
		this.scene.start('GameOverScene');
	}

	update() {
		this.player.body.setVelocity(0);

		if (window.innerWidth < 900 && window.innerWidth > 200 && this.boss) {
			this.boss.y = this.boss.displayHeight / 2 + 10;
		}

		if (window.innerWidth > 1000) {
			this.player.setScale(0.6)
			this.bullets.children.each(bullet => {
            if (bullet.active) {
                bullet.setScale(0.5);
            }
        });

			
		}
		if (window.innerWidth < 1000 && window.innerWidth > 900 ) {
		
			this.player.setScale(0.8)
			this.bullets.children.each(bullet => {
            if (bullet.active) {
                bullet.setScale(0.5);
            }
        });
			
		}


		if (window.innerWidth < 900 && window.innerWidth > 200) {
			this.player.setScale(0.4);
			this.bullets.children.each(bullet => {
				if (bullet.active) {
					bullet.setScale(0.2);
				}
			});
			this.boss.setScale(0.3);
			this.bossLifeText.setFontSize('18px');
			// Ajusta el fondo
			if (this.background) {
				this.background.setSize(this.scale.width, this.scale.height);
			}
			// Ajusta balas enemigas
			this.enemyBullets.children.each(bullet => {
				if (bullet.active) {
					bullet.setScale(0.2);
				}
			});
			// Ajusta botones de Game Over si existen
			if (this.scene.isActive('GameOverScene')) {
				const gameOverScene = this.scene.get('GameOverScene');
				if (gameOverScene.restartBtn) gameOverScene.restartBtn.setFontSize('48px');
				if (gameOverScene.backBtn) gameOverScene.backBtn.setFontSize('40px');
			}
			// Reduce velocidad del boss en X (sobrescribe cualquier lógica anterior)
			this.bossSpeedX = this.bossSpeedX < 0 ? -2 : 2;
			// Haz el láser más delgado
			if (this.laserActive) {
				this.laserActive.lineWidth = 3;
			}
		}

		// Movimiento automático del boss en eje X
		if (this.boss) {
			// Si pantalla pequeña, no modificar bossSpeedX aquí
			if (!(window.innerWidth < 900 && window.innerWidth > 200)) {
				if (this.bossLife < 60) {
					this.bossSpeedX = this.bossSpeedX < 0 ? -9: 9;
				} else {
					this.bossSpeedX = this.bossSpeedX < 0 ? -6 : 6;
				}
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

		// Actualiza las balas enemigas
		this.enemyBullets.children.each(bullet => {
			if (bullet.active) {
				bullet.update();
			}
		});
		
		// Cambia el delay del disparo del boss según la vida
		if (this.bossShootEvent) {
			const newDelay = this.bossLife < 50 ? 330 : 550;
			if (this.bossShootEvent.delay !== newDelay) {
				this.bossShootEvent.reset({ delay: newDelay, callback: this.bossShootEvent.callback, callbackScope: this.bossShootEvent.callbackScope, loop: true });
			}
		}

		// Colisión player-láser
		if (
			this.laserActive &&
			this.laserActive.active &&
			this.player.active &&
			this.laserActive.alpha > 0.5 // Solo cuando el láser es visible
		) {
			const px = this.player.x;
			const py = this.player.y;
			const laserX = this.laserActive.laserX;
			const laserY1 = this.laserActive.laserY1;
			const laserY2 = this.laserActive.laserY2;
			const laserWidth = 20;
			if (
				px > laserX - laserWidth / 2 && px < laserX + laserWidth / 2 &&
				py > laserY1 && py < laserY2
			) {
				this.laserActive.active = false;
				this.gameOver();
			}
		}
	}

	resizeBackground(gameSize) {
		if (this.background) {
			this.background.setSize(gameSize.width, gameSize.height);
		}
	}
}

