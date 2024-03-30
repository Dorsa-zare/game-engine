class Forgiveness extends Phaser.Scene {
    constructor() {
        super({
            key: `forgiveness`
        });
    }

    create() {
        // Add the rainbow image as the background
        const rainbow = this.add.image(0, 0, 'rainbow').setOrigin(0);
        rainbow.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 471, `avatar`);
        this.avatar.setScale(3);
        this.avatar.setDepth(3);

        // Call the method to create animations for avatar
        this.createAnimations();

        // Call the method to show text
        this.displayText();

    }

    update() {
        this.avatar.anims.play('avatar-moving', true);
    }


    createAnimations() {
        // Animation properties for the avatar
        this.anims.create({
            key: `avatar-moving`,
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1
        });
    }


    displayText() {
        // Display text indicating forgiveness
        const forgivenessText = this.add.text(this.game.config.width / 2, 280, "You choose to forgive the bullies.\nLet's move forward with \nkindness and empathy.", {
            font: "24px Arial",
            fill: "#00ff00", // Green color
            stroke: "#000000", // Black stroke
            strokeThickness: 3, // Thickness of the stroke
            align: "center"
        });
        forgivenessText.setOrigin(0.5);
    }
}
