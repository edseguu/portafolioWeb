export class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }
    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const isSmall = width < 1000;
        const fontSizeRestart = isSmall ? '48px' : '32px';
        const fontSizeBack = isSmall ? '40px' : '28px';
        this.add.text(width / 2, height / 2 - 40, 'GAME OVER', { fontSize: isSmall ? '80px' : '64px', fill: '#ff0000' }).setOrigin(0.5);
        const restartBtn = this.add.text(width / 2, height / 2 + 40, 'Reiniciar', { fontSize: fontSizeRestart, fill: '#fff', backgroundColor: '#333', padding: { x: 30, y: 18 } }).setOrigin(0.5).setInteractive();
        restartBtn.on('pointerdown', () => {
            this.scene.stop('GameOverScene');
            this.scene.stop('BulletSpace');
            this.scene.start('BulletSpace');
        });
        const backBtn = this.add.text(width / 2, height / 2 + 120, 'Volver a Inicio', { fontSize: fontSizeBack, fill: '#fff', backgroundColor: '#225', padding: { x: 28, y: 14 } }).setOrigin(0.5).setInteractive();
        backBtn.on('pointerdown', () => {
            this.scene.stop('GameOverScene');
            this.scene.stop('BulletSpace');
            this.scene.start('Start');
        });
    }
}
