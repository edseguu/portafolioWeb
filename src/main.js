import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    title: 'Overlord Rising',
    description: '',
    width: 800,
    height: 600,
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
            