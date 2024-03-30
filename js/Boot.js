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
        // Load red avatar image
        this.load.spritesheet(`redavatar`, `assets/images/redavatar.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 9
        });

        // Load school image
        this.load.image(`school`, `assets/images/school.png`);
        // Load broken heart image
        this.load.image(`heart`, `assets/images/heart.png`);
        // Load street image
        this.load.image(`street`, `assets/images/street.png`);
        // Load car image
        this.load.image(`bus`, `assets/images/bus.png`);
        // Load bully image
        this.load.image(`bully`, `assets/images/bully.png`);
        // Load flower image
        this.load.image(`flower`, `assets/images/flower.png`);
        // Load rainbow image
        this.load.image(`rainbow`, `assets/images/rainbow.png`);

        this.load.on(`complete`, () => {
            this.scene.start(`bullying`);
        });
    }

    create() {

    }

    update() {

    }
}