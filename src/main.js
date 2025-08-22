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
    scene: [
        Start
    ]
}

new Phaser.Game(config);
            