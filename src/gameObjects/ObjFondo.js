export class ObjFondo {

    
    constructor(scene) {
        this.scene = scene


        this.setUpObjFondo()

        
    }

    setUpObjFondo(){

        const arrayObjFondo = [
            this.scene.obj1,
            this.scene.obj2
        ]


        arrayObjFondo.forEach(element => {
            this.scene.physics.add.existing(element);
            element.body.setVelocity(Math.floor(Math.random() * 400), 100)
            
            element.on('pointerup', () => {
                element.destroy()
                true ? this.scene.scorePoint++ : "Error Score"
                
        });




            
        });



    }


}