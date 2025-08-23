import {ObjMeteoro} from "..//gameObjects/ObjMeteoro.js"
import { ObjNave } from "../gameObjects/ObjNave.js";
import { InputScreen } from "./InputScreen.js";



export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
        this.scrolling = false;
        this.lastY = 0;
    }

    preload() {
        this.load.pack('resource', 'assets/data/assets.json');
    }


    
    create() {
        this.input.setDefaultCursor('url(assets/images/a.cur), none');
        this.scale.on('resize', this.resize, this)


        //Fondo de pantalla tileSprite
       this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);

       // Texto de inicio
       this.text1 = this.add.text(0, 0, 'Eduardo Segura:\n \n Ingeniero de Software', {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        align: "center",
        fontSize: "45px"
    }).setOrigin(0.5, 0.5);
    
    // Texto de proyectos
        this.textProyect = this.add.text(0, 0, 'Proyectos', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "45px"
        }).setOrigin(0.5, 0.5);

        // Se añaden los 3 aliens
        this.alien1 = new ObjNave(this, 0, 0, "alien1", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.alien2 = new ObjNave(this, 0, 0, "alien2", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.alien3 = new ObjNave(this, 0, 0, "alien3", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });


        // Texto de proyectos
        this.textProyectMore = this.add.text(0, 0, 'Mas proyectos...', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "35px"
        }).setOrigin(0.5, 0.5).setColor("#5bb3d8ff").setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });


        // Texto de contacto
        this.textContact = this.add.text(0, 0, 'Contacto', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "45px"
        }).setOrigin(0.5, 0.5);


        // Se añaden los 3 sociales
        this.socialGit = new ObjNave(this, 0, 0, "githubSocial", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.socialMail = new ObjNave(this, 0, 0, "mailSocial", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.socialLinke = new ObjNave(this, 0, 0, "linkeSocial", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });


        const initialHeight = this.scale.height;
        this.text1.y = initialHeight * 0.50;
        this.textProyect.y = initialHeight * 0.9;

        const alienY = initialHeight * 1.2
        this.alien1.y = alienY;
        this.alien2.y = alienY;
        this.alien3.y = alienY;

        this.textProyectMore.y = initialHeight * 1.5;
        this.textContact.y = initialHeight * 1.8;

        const socialY = initialHeight * 2.1;
        this.socialGit.y = socialY;
        this.socialMail.y = socialY;
        this.socialLinke.y = socialY;
        
        this.resize({ width: this.scale.width, height: this.scale.height });
        

        this.touchInputManager = new InputScreen(this);

        console.log(this.text1.style);
        
    }
    
    
    resize(gameSize, baseSize, displaySize, resolution) {
        const { width, height } = gameSize;
        this.cameras.main.setViewport(0, 0, width, height);
        
        // Actualiza el tamaño del fondo
        this.background.width = width;
        this.background.height = height;
        
        // Posiciona todos los elementos, manteniendo la posición 'y' relativa
        // que ya fue definida en create() o modificada por el scroll, y centra la 'x'.
        this.text1.setX(width / 2);
        this.textProyect.setX(width / 2);


        const spacingXalien = 450;
        this.alien1.setX(width / 2 - spacingXalien);
        this.alien2.setX(width / 2);
        this.alien3.setX(width / 2 + spacingXalien);

        this.textProyectMore.setX(width / 2);
        
        this.textContact.setX(width / 2);

        const spacingXsocial = 360;
        this.socialGit.setX(width / 2 + spacingXsocial);
        this.socialMail.setX(width / 2);
        this.socialLinke.setX(width / 2 - spacingXsocial);
}



    update() {



        if (window.innerWidth > 900 && window.innerWidth < 1000) {
            this.text1.style.setFontSize("45px")
            this.textProyect.setFontSize("80px")
            
            this.alien1.setPosition(innerWidth/2, this.textProyect.y + 350)
            this.alien2.setPosition(innerWidth / 2, this.alien1.y + 550)
            this.alien3.setPosition(innerWidth / 2, this.alien2.y + 550)
            
            
            this.textProyectMore.setPosition(innerWidth / 2, this.alien3.y + 250)
            this.textContact.setPosition(innerWidth / 2, this.textProyectMore.y + 200)

            this.socialLinke.setPosition(innerWidth / 2, this.textContact.y + 250)
            this.socialMail.setPosition(innerWidth / 2, this.socialLinke.y + 400)
            this.socialGit.setPosition(innerWidth / 2, this.socialMail.y + 400)
        }
        if (window.innerWidth > 300 && window.innerWidth < 900) {
            this.text1.style.setFontSize("25px")

            
            
            this.alien1.setPosition(innerWidth/2, this.textProyect.y + 250)
            this.alien2.setPosition(innerWidth / 2, this.alien1.y + 400)
            this.alien3.setPosition(innerWidth / 2, this.alien2.y + 400)


            this.textProyectMore.setPosition(innerWidth / 2, this.alien3.y + 250)
            this.textContact.setPosition(innerWidth / 2, this.textProyectMore.y + 200)

            this.socialLinke.setPosition(innerWidth / 2, this.textContact.y + 250)
            this.socialMail.setPosition(innerWidth / 2, this.socialLinke.y + 400)
            this.socialGit.setPosition(innerWidth / 2, this.socialMail.y + 400)
        }
    }
    
}
