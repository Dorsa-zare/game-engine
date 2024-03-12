class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        // Add the street image as the background
        const street = this.add.image(0, 0, 'street').setOrigin(0);

        // Set the scale of the street image 
        street.setScale(1);

        // Add physics-enabled sprite for avatar
        this.avatar = this.physics.add.sprite(300, 300, `avatar`);
        // Set the scale of the sprite
        this.avatar.setScale(2);
        // Call the method to create animations
        this.createAnimations();
        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Display Cars
        this.addCars();

        // Display pedestrians
        this.addPedestrians();
    }


    update() {
        // Movement controls for the avatar
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
        // Check collision between avatar and cars
        this.physics.world.collide(this.avatar, [this.car1, this.car2], this.handleCollision, null, this);
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
        // Add the first car sprite moving from right to left
        this.car1 = this.physics.add.sprite(this.game.config.width + 100, 240, `car`);
        this.car1.setScale(0.05);

        // Define the tween to move the first car from right to left
        this.tweens.add({
            targets: this.car1,
            x: -100,
            duration: 2300, // Duration of the tween in milliseconds
            ease: 'Linear',
            repeat: -1 // Repeat indefinitely
        });

        // Add the second car sprite moving from left to right
        this.car2 = this.physics.add.sprite(-100, 380, `car`);
        this.car2.setScale(0.05);

        // Define the tween to move the second car from left to right
        this.tweens.add({
            targets: this.car2,
            x: this.game.config.width + 100,
            duration: 2000,
            ease: 'Linear',
            repeat: -1
        });
        // Add the third car sprite moving from right to left
        this.car3 = this.physics.add.sprite(this.game.config.width + 100, 520, `car`);
        this.car3.setScale(0.05);

        // Define the tween to move the third car from right to left
        this.tweens.add({
            targets: this.car3,
            x: -100, 
            duration: 1700,
            ease: 'Linear',
            repeat: -1 
        });

        // Setup collider between avatar and cars
        this.physics.add.collider(this.avatar, [this.car1, this.car2, this.car3, this.car4], this.handleCollision, null, this);
    }


    handleCollision(avatar, car) {
        // Stop car movement
        car.body.setVelocity(0);

        // Move the car in the opposite direction
        car.body.setVelocityX(-car.body.velocity.x);
        car.body.setVelocityY(-car.body.velocity.y);
    }

    addPedestrians() {
        // Define the number of pedestrians you want to add
        const numPedestrians = 3;

        for (let i = 0; i < numPedestrians; i++) {
            // Generate random coordinates within the canvas boundaries
            const x = Phaser.Math.Between(0, this.game.config.width);
            const y = Phaser.Math.Between(0, this.game.config.height);

            // Add pedestrian sprite
            const pedestrian = this.add.sprite(x, y, 'pedestrian');

            // Scale the pedestrian 
            pedestrian.setScale(1.6);

            // Set the depth of the pedestrian sprite to appear behind the avatar
            pedestrian.setDepth(0);
        }
    }

}
