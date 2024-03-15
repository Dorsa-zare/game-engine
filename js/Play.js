class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
        // Initialize bullies array
        this.bullies = [];
        // Initialize flower counter
        this.flowerCounter = 0;
    }

    create() {
        // Add the street image as the background
        const street = this.add.image(0, 0, 'street').setOrigin(0);
        street.setScale(1);

        // Add physics-enabled sprite for avatar
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 500, `avatar`);
        this.avatar.setScale(2.2); // Set the scale 
        this.avatar.setDepth(3); // Set the depth to make it appear on top 

        // Add physics-enabled sprite for red avatar
        this.redavatar = this.physics.add.sprite(this.game.config.width / 2, 500, `redavatar`);
        this.redavatar.setScale(2.2);
        this.redavatar.setDepth(3);
        this.redavatar.setVisible(false);// Initially hide the red avatar

        // Display bus
        this.addBus();

        // Setup collider between avatar and bus
        this.physics.add.overlap(this.avatar, this.bus, this.handleCollision, null, this);

        // Call the method to create animations
        this.createAnimations();
        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Display bully
        this.addBully();

        // Setup collider between avatar and bullies
        this.physics.add.collider(this.avatar, this.bullies, this.handleBullyCollision, null, this);

        // Setup collider between bus and bullies
        for (const bully of this.bullies) {
            this.physics.add.collider(this.bus, bully, (bus, bully) => this.handleBusBullyCollision(bus, bully), null, this);
        }
        // Initialize bullies array
        this.bullies = [];

        // Create a group for flowers
        this.flowerGroup = this.add.group();

        // Create text object for congratulatory message
        this.congratsText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 110, 'Look who is the bully now!', {
            fontFamily: 'Arial Black',
            fontSize: 34,
            color: '#990000',
            stroke: ' #ff4d4d',
            strokeThickness: 10
        });
        this.congratsText.setOrigin(0.5);
        this.congratsText.setVisible(false); // Initially invisible

        // Create text object for instructions
        const instructionsText = this.add.text(this.game.config.width / 2, 50, 'Use keyboard arrows to push your bullies under the bus', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000',
            strokeThickness: 3
        });
        instructionsText.setOrigin(0.5);
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

        this.handleBusMovement();

        // Check if the congratulatory message is visible
        if (this.congratsText.visible) {
            // Hide the regular avatar
            this.avatar.setVisible(false);
            // Show the red avatar
            this.redavatar.setVisible(true);
            // Change avatar animation to redavatar-moving
            this.redavatar.anims.play('redavatar-moving', true);
        }
        // Set the depth of the character sprite to appear on top 
        this.avatar.setDepth(3);
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

        // Animation properties for the red avatar
        this.anims.create({
            key: `redavatar-moving`,
            frames: this.anims.generateFrameNumbers(`redavatar`, {
                start: 0,
                end: 9
            }),
            frameRate: 12,
            repeat: -1
        });
    }


    addBus() {
        // Add the first bus sprite moving from right to left
        this.bus = this.physics.add.sprite(1000, 200, `bus`);
        this.bus.setScale(0.30);
        this.bus.setVelocityX(-200);
        // Set the depth of the bus sprite
        this.bus.setDepth(2);
    }

    handleBusMovement() {
        if (this.bus.x < -200) {
            // Reset bus position if it goes off the screen
            this.bus.x = 1000;
        }
    }

    addBully() {
        // Define the number of bully
        const numBully = 8;
        const bullies = []; // Array to store the positions of existing bullies

        for (let i = 0; i < numBully; i++) {
            let x, y;
            let validPosition = false;

            // Repeat until a valid position is found
            while (!validPosition) {
                // Generate random coordinates within the bottom half of the canvas
                x = Phaser.Math.Between(100, this.game.config.width);
                y = Phaser.Math.Between(this.game.config.height / 2 + 60, this.game.config.height);

                // Check if the position conflicts with existing bullies
                let conflicting = false;
                for (const bully of bullies) {
                    if (Phaser.Math.Distance.Between(x, y, bully.x, bully.y) < 100) {
                        conflicting = true;
                        break;
                    }
                }

                // If there's no conflict, set validPosition to true
                if (!conflicting) {
                    validPosition = true;
                }
            }

            // Add bully sprite
            const bully = this.physics.add.sprite(x, y, 'bully');

            // Make bully pushable
            bully.setPushable(true);

            // Scale the bully 
            bully.setScale(1.6);

            // Set the depth of the bully sprite to appear behind the avatar
            bully.setDepth(1);
            // Enable collisions with the world bounds
            bully.setCollideWorldBounds(true);

            // Set the bounce effect when the bully hits the world bounds
            bully.setBounce(1);

            // Add the bully to the bullies array
            this.bullies.push(bully);

        }
    }

    handleBullyCollision(avatar, bully) {
        // bully's velocity
        const reducedVelocityX = bully.body.velocity.x * 0.2;
        const reducedVelocityY = bully.body.velocity.y * 0.2;

        // Set the velocity
        bully.body.setVelocity(reducedVelocityX, reducedVelocityY);
    }

    handleBusBullyCollision(bus, bully) {
        // Reset bus position and velocity
        this.resetBusPositionAndVelocity();
        // Handle bully collision
        bully.destroy();
        // Show flower at the collision position
        this.showFlower(bully.x, bully.y);
    }

    resetBusPositionAndVelocity() {
        // Reset bus position
        this.bus.x = 1000;
        // Reset bus velocity
        this.bus.setVelocityX(-200);
        this.bus.setVelocityY(0);
    }

    showFlower(x, y) {
        // Add flower at the collision position
        const flower = this.add.sprite(x, y, 'flower');
        flower.setScale(2.4);
        // Add the flower to the flower group
        this.flowerGroup.add(flower);
        // Increment flower counter
        this.flowerCounter++;
        // Check if 8 flowers have been collected
        if (this.flowerCounter >= 8) {
            // Display the congratulatory message
            this.congratsText.setVisible(true);
        }
    }
}

