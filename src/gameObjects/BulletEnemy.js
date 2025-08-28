export class BulletEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bulletEnemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setActive(false);
        this.setVisible(false);
    }

    fire(x, y, targetX, targetY) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        // Calcular dirección hacia el jugador
        const dx = targetX - x;
        const dy = targetY - y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const speed = 350;
        this.lastVelocity = { x: (dx / length) * speed, y: (dy / length) * speed };
        this.setVelocity(this.lastVelocity.x, this.lastVelocity.y);
        this.followingPlayer = true;
        this.followTimer = 0;
        this.play('animaPlayEnemy');
    }

    update(time, delta) {
        delta = typeof delta === 'number' ? delta : 5;
        // Rotar la bala mientras está activa
        if (this.active) {
            this.angle += 0.6;
            if (this.followingPlayer) {
                this.followTimer += delta;
                if (this.scene && this.scene.player && this.followTimer < 4000) {
                    const dx = this.scene.player.x - this.x;
                    const dy = this.scene.player.y - this.y;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const speed = 450;
                    this.lastVelocity = { x: (dx / length) * speed, y: (dy / length) * speed };
                    this.setVelocity(this.lastVelocity.x, this.lastVelocity.y);
                } else {
                    this.setVelocity(this.lastVelocity.x, this.lastVelocity.y);
                    this.followingPlayer = false;
                }
            }
        }
        // Desactivar si sale de pantalla
        if (
            this.x < -this.width ||
            this.x > this.scene.scale.width + this.width ||
            this.y < -this.height ||
            this.y > this.scene.scale.height + this.height
        ) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
