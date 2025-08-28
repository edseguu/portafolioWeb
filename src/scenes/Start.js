import {ObjFondo} from "../gameObjects/ObjFondo.js"
import { MoveObject } from "../gameObjects/MoveObject.js";
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
		this.scale.on('resize', this.resize, this);


        //Fondo de pantalla tileSprite
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);
        
        
        //Objetos de fondo
        this.obj1 = new MoveObject(this,-100, -10, 'obj1', 0, -1).setInteractive()
        this.obj2 = new MoveObject(this,600, -100, 'obj2', 0, -1).setInteractive()
        this.obj3 = new MoveObject(this,-900, -100, 'obj3', 0, -1).setInteractive()
        this.obj4 = new MoveObject(this,-900, -100, 'obj4', 0, -1).setInteractive()
        this.obj5 = new MoveObject(this,-1100, -100, 'obj5', 0, -1).setInteractive()


        this.setUpObjFondo = new ObjFondo(this);
        this.scorePoint = 0
        
        this.score = this.add.text(100, 50, this.scorePoint, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        align: "center",
        fontSize: "30px"
    }).setOrigin(0.5, 0.5);
        this.scoreLevel = this.add.text(100, 90, "5 = ?", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        align: "center",
        fontSize: "20px"
    }).setOrigin(0.5, 0.5);
    
    
    
    
    //cartel de peligro
    this.cartel = new MoveObject(this, 0 ,0, "cartel", 0 ,-1)
    this.cartel2 = new MoveObject(this, 0 ,0, "cartel", 0 ,-1)
    


    // Texto de inicio
       this.text1 = this.add.text(0, 0, 'Eduardo Segura:\n \n Ingeniero de Software', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "45px"
    }).setOrigin(0.5, 0.5);
    
    // Texto de proyecto
        this.textProyect = this.add.text(0, 0, 'Proyectos', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "45px"
        }).setOrigin(0.5, 0.5);


        // Se añaden los 3 aliens
        this.alien1 = new MoveObject(this, 0, 0, "alien1", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.alien2 = new MoveObject(this, 0, 0, "alien2", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.alien3 = new MoveObject(this, 0, 0, "alien3", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });


        // Texto de más proyectos
        this.textProyectMore = this.add.text(0, 0, 'Mas proyectos...', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "35px"
        }).setOrigin(0.5, 0.5).setColor("#5bb3d8ff").setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });


        // Texto de contacto
        this.textContact = this.add.text(0, 0, 'Contacto', {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            align: "center",
            fontSize: "55px"
        }).setOrigin(0.5, 0.5);


        // Se añaden los 3 sociales
        this.socialGit = new MoveObject(this, 0, 0, "githubSocial", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.socialMail = new MoveObject(this, 0, 0, "mailSocial", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        this.socialLinke = new MoveObject(this, 0, 0, "linkeSocial", 0, -1).setInteractive({ cursor: 'url(assets/images/b.cur), pointer' });
        
        this.resize({ width: this.scale.width, height: this.scale.height });
        
		
        this.touchInputManager = new InputScreen(this);
        
    }
    
    
    resize(gameSize, baseSize, displaySize, resolution) {
		const width = gameSize.width;
		const height = gameSize.height;
		this.background.setDisplaySize(width, height);
        
        // Posiciona todos los elementos, manteniendo la posición 'y' relativa
        // que ya fue definida en create() o modificada por el scroll, y centra la 'x'.
        this.cartel.setX(width /2)
        this.cartel2.setX(width /2)
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
}

    update() {
        this.physics.world.wrap(this.obj1, 50);
        this.physics.world.wrap(this.obj2, 50);
        this.physics.world.wrap(this.obj3, 60);
        this.physics.world.wrap(this.obj4, 40);
        this.physics.world.wrap(this.obj5, 40);

        this.score.setText("Score:" + " " +this.scorePoint)
        if (this.scorePoint === 5) {
            this.scene.start('BulletSpace');
        }


        if (window.innerWidth > 1000) {
            this.text1.style.setFontSize("45px")
            this.textProyect.setFontSize("45px")

            this.cartel.setPosition(innerWidth / 2, this.text1.y - 900)
            this.cartel2.setPosition(innerWidth / 2, this.cartel.y + 3300)
            this.cartel.setScale(1.5)
            this.cartel2.setScale(1.5)
        }

        
        



        if (window.innerWidth > 900 && window.innerWidth < 1000) {
            this.text1.style.setFontSize("45px")
            this.textProyect.setFontSize("80px")
			this.textContact.setFontSize("80px")
            
            this.alien1.setPosition(innerWidth/2, this.textProyect.y + 350)
            this.alien2.setPosition(innerWidth / 2, this.alien1.y + 550)
            this.alien3.setPosition(innerWidth / 2, this.alien2.y + 550)
            
            
            this.textProyectMore.setPosition(innerWidth / 2, this.alien3.y + 250)
            this.textContact.setPosition(innerWidth / 2, this.textProyectMore.y + 200)

            this.socialLinke.setPosition(innerWidth / 2, this.textContact.y + 250)
            this.socialMail.setPosition(innerWidth / 2, this.socialLinke.y + 400)
            this.socialGit.setPosition(innerWidth / 2, this.socialMail.y + 400)

            this.cartel.setScale(2)
            this.cartel2.setScale(2)
            this.cartel.setPosition(innerWidth / 2, this.text1.y - 1100)
            this.cartel2.setPosition(innerWidth / 2, this.cartel.y + 6200)

            this.obj1.setScale(1.5)
            this.obj2.setScale(1.5)
            this.obj3.setScale(1.5)
            this.obj4.setScale(1.5)
            this.obj5.setScale(1.5)
        }
        if (window.innerWidth > 300 && window.innerWidth < 900) {
            this.text1.style.setFontSize("25px")
			this.textProyect.setFontSize("25px")
            this.alien1.setPosition(innerWidth/2, this.textProyect.y + 250)
            this.alien2.setPosition(innerWidth / 2, this.alien1.y + 400)
            this.alien3.setPosition(innerWidth / 2, this.alien2.y + 400)


            this.textProyectMore.setPosition(innerWidth / 2, this.alien3.y + 250)
            this.textContact.setPosition(innerWidth / 2, this.textProyectMore.y + 200)

            this.socialLinke.setPosition(innerWidth / 2, this.textContact.y + 250)
            this.socialMail.setPosition(innerWidth / 2, this.socialLinke.y + 400)
            this.socialGit.setPosition(innerWidth / 2, this.socialMail.y + 400)

            this.cartel.setScale(1)
            this.cartel2.setScale(1)
            this.cartel.setPosition(innerWidth / 2, this.text1.y - 1100)
            this.cartel2.setPosition(innerWidth / 2, this.cartel.y + 5200)
            
            this.obj1.setScale(3)
            this.obj2.setScale(3)
            this.obj3.setScale(3)
            this.obj4.setScale(3)
            this.obj5.setScale(3)
        }
    }
    
}
