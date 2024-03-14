class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        // Load avatar image
        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 5
        });

        // Load street image
        this.load.image(`street`, `assets/images/street.png`);
        // Load car image
        this.load.image(`bus`, `assets/images/bus.png`);
        // Load pedestrian image
        this.load.image(`bully`, `assets/images/bully.png`);

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}