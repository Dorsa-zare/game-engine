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
            endFrame: 3
        });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}