export class ObjFondo {

    
    constructor(scene) {
        this.scene = scene


        this.setUpObjFondo()

        
    }

    setUpObjFondo(){

        const arrayObjFondo = [
            this.scene.obj1,
            this.scene.obj2,
            this.scene.obj3,
            this.scene.obj4,
            this.scene.obj5
        ]


        arrayObjFondo.forEach(element => {
            this.scene.physics.add.existing(element);
            element.body.setVelocity(Math.floor(Math.random() * 400), Math.floor(Math.random() * 600))
            
            element.on('pointerup', () => {
                element.destroy()
                true ? this.scene.scorePoint++ : "Error Score"
                
        });




            
        });



    }


}