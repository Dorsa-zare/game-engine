class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        // Load assets

        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 5
        });

        this.load.image(`car`, `assets/images/car.png`);

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}