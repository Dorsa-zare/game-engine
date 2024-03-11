class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        // Set the background color to gray
        this.cameras.main.setBackgroundColor(0x999999); // Light gray

        // Add physics-enabled sprite
        this.avatar = this.physics.add.sprite(300, 300, `avatar`);

        // Set the scale of the sprite
        this.avatar.setScale(2.5);

        // Call the method to create animations
        this.createAnimations();

        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    update() {
        // Movement controls
        this.avatar.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(300);
        }

        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(300);
        }
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

        // Play the animation
        this.avatar.play(`avatar-moving`);
    }

}
