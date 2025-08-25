export class InputScreen {

    constructor(scene) {
        this.scene = scene;
        this.scrolling = false;
        this.lastY = 0;

        // Configura los eventos del puntero en la escena
        this.setupPointerEvents();
        // Configura los eventos de la rueda del ratón
        this.setupWheelEvents();
    }

    setupPointerEvents() {


        this.scene.input.on('pointerdown', (pointer, deltaY) => {
            this.lastY = pointer.y;
            this.scrolling = false;
            
        });

        this.scene.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                const deltaY = pointer.y - this.lastY;
                if (Math.abs(deltaY) > 5) {
                    this.scrolling = true;
                }
                if (this.scrolling) {
                    // Mueve solo el tilePositionY del fondo
                    this.scene.background.tilePositionY += deltaY;
                    const arrayGameObjects = [
                        this.scene.socialGit,
                        this.scene.socialLinke,
                        this.scene.socialMail,
                        this.scene.text1,
                        this.scene.textProyect,
                        this.scene.textProyectMore,
                        this.scene.textContact,
                        this.scene.alien1,
                        this.scene.alien2,
                        this.scene.alien3,
                        this.scene.cartel,
                        this.scene.cartel2
                    ];
                    arrayGameObjects.forEach(element => {
                        element.y += deltaY;
                    });
                }
                this.lastY = pointer.y;
            }
        });

        this.scene.input.on('pointerup', (pointer) => {
            if (!this.scrolling) {
                if (this.scene.socialGit.getBounds().contains(pointer.x, pointer.y)) {
                    window.open("https://github.com/edseguu", "_blank");
                } else if (this.scene.socialMail.getBounds().contains(pointer.x, pointer.y)) {
                    const email = "mailto:segura2011@live.com";
                    window.location.href = email;
                } else if (this.scene.socialLinke.getBounds().contains(pointer.x, pointer.y)) {
                    window.open("https://www.linkedin.com/in/eduardosegura0102/", "_blank");
                }
            }
            this.scrolling = false;
        });
            // ...existing code...
    }

    setupWheelEvents() {
        this.scene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            this.scene.background.tilePositionY += deltaY * 0.5;
            let arrayGameObjects = [
                this.scene.socialGit,
                this.scene.socialLinke,
                this.scene.socialMail,
                this.scene.text1,
                this.scene.textProyect,
                this.scene.textProyectMore,
                this.scene.textContact,
                this.scene.alien1,
                this.scene.alien2,
                this.scene.alien3,
                this.scene.cartel,
                this.scene.cartel2

            ];
            arrayGameObjects.forEach(element => {
                element.y -= deltaY * 0.4;
            });
        });
    }
}

