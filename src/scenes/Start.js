import {ObjMeteoro} from "..//gameObjects/ObjMeteoro.js"
import { ObjNave } from "../gameObjects/ObjNave.js";



export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.pack('resource', 'assets/data/assets.json');
    }

    resize(gameSize, baseSize, displaySize, resolution){
        const width = window.innerWidth
        const height = window.innerHeight

        this.background.width = width
        this.background.height = height


        this.text1.setPosition(width/2, height/2)
        this.textProyect.setPosition(width/2, height/1.1)


        this.met1.setPosition(width/2, height/2)
        this.met1.setScale(2)
        if (width < 900) {
            this.met1.setScale(4)
            this.text1.setFontSize("15px")
            this.nav1.destroy()
        } else if(width >900){
            this.text1.setFontSize("45px")
        }



    }

    create() {

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;


        
        
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0,0)
        this.met1 = new ObjMeteoro(this, 50,50, "meteoro1")
        //this.nav1 = new ObjNave(this, centerX, 1200, "nav1", 0, -1)
        //this.nav2 = new ObjNave(this, centerX, 1500, "nav2",0, -1 )
        //this.nav3 = new ObjNave(this, centerX, 1800, "nav3",0, -1 )

        const spacing = 360;

        this.socialGit = new ObjNave(this, centerX + spacing ,2400, "githubSocial",0,-1)
        this.socialMail = new ObjNave(this, centerX,2400 , "mailSocial",0, -1 )
        this.socialLinke = new ObjNave(this, centerX - spacing,2400 , "linkeSocial",0, -1 )

        this.alien1 = new ObjNave(this, 400,400 , "alien1",0, -1 )


        
        this.text1 = this.add.text(0, 0, 'Eduardo Segura:\n \n Ingeniero de Software', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', align: "center", fontSize: "45px" }).setPosition(innerWidth /2, innerHeight/2).setOrigin(0.5,0.5)

        this.textProyect = this.add.text(0, 0, 'Proyectos', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', align: "center", fontSize: "45px" }).setPosition(innerWidth /2, innerHeight/1.1).setOrigin(0.5,0.5)
        this.textContact = this.add.text(0, 0, 'Contacto', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', align: "center", fontSize: "45px" }).setPosition(innerWidth /2, innerHeight/1.1).setOrigin(0.5,-23)
    
        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) =>{
            this.background.tilePositionY += deltaY * 0.5

            let arrayGameObjects = [
                //objetos de redes sociales
                this.socialGit,
                this.socialLinke,
                this.socialMail,
                //objetos de texto
                this.text1,
                this.textProyect,
                this.textContact,
                //objetos de meteoros
                this.met1
            ]

            //Iterador del array (arrayGameObjects), agrega movimiento con el wheel del mouse
            arrayGameObjects.forEach(element => {
                element.y -= deltaY * 0.4
            });
        })


        this.scale.on("resize", this.resize, this)
        this.resize()
        
    }



    update() {
        
       // if (this.met1.y > innerHeight || this.met1.y < -100) {
         //   this.met1.destroy()
          //  this.met1 = this.add.image(50,innerHeight, 'met1')
        //}       
    }
    
}
