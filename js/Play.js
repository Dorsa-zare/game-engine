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

        // Display Cars
        this.addCars();
    }

    addGreenSquare(x, y) {
        // Create green square
        let square = this.add.rectangle(x, y, 350, 200, 0x5aab46); // Green color
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


    addCars() {
        // Add the first car sprite moving downwards
        this.car1 = this.add.sprite(340, 800, `car`);
        this.car1.setScale(0.05);
        this.car1.setRotation(Phaser.Math.DegToRad(180)); // Set rotation to 180 degrees

        // Define the tween to move the first car from bottom to top
        this.tweens.add({
            targets: this.car1,
            y: -100, // Destination Y coordinate
            duration: 2000, // Duration of the tween in milliseconds
            ease: 'Linear',
            repeat: -1 // Repeat indefinitely
        });

        // Add the second car sprite moving upwards
        this.car2 = this.add.sprite(460, -100, `car`);
        this.car2.setScale(0.05);
        this.car2.setTint(0x2222dd); // Set tint to blue

        // Define the tween to move the second car from top to bottom
        this.tweens.add({
            targets: this.car2,
            y: 800, // Destination Y coordinate
            duration: 2000, // Duration of the tween in milliseconds
            ease: 'Linear',
            repeat: -1 // Repeat indefinitely
        });
    }

}
