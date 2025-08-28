import { BulletSpace, GameOverScene } from './scenes/BulletSpace.js';
import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
    },
    title: 'Overlord Rising',
    description: '',
    width: window.innerWidth,
    height: window.innerHeight,
    input: {
        touch: {
            capture: true,
            enabled: true 
        }
    },
    backgroundColor: '#000000',
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
    
        BulletSpace,
        GameOverScene
    ]
}

new Phaser.Game(config);
