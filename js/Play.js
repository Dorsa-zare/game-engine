class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        // Set the background color to gray
        this.cameras.main.setBackgroundColor(0xbfbfbf); // Light gray

        // Add physics-enabled sprite
        this.avatar = this.physics.add.sprite(300, 300, `avatar`);

        // Set the scale of the sprite
        this.avatar.setScale(2);

        // Call the method to create animations
        this.createAnimations();

        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();


        // Add green squares
        this.addGreenSquare(100, 100); // Top-left corner
        this.addGreenSquare(700, 100); // Top-right corner
        this.addGreenSquare(100, 500); // Bottom-left corner
        this.addGreenSquare(700, 500); // Bottom-right corner
    }

    addGreenSquare(x, y) {
        // Create green square
        let square = this.add.rectangle(x, y, 350, 200, 0x5aab46); // Green color
        // Set origin to center for better positioning
        square.setOrigin(0.5);
        return square;
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
        // Set the depth of the character sprite to appear on top of the green squares
        this.avatar.setDepth(1);
    }

}
