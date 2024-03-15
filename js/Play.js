class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
        // Initialize bullies array
        this.bullies = [];
    }

    create() {
        // Add the street image as the background
        const street = this.add.image(0, 0, 'street').setOrigin(0);
        street.setScale(1);

        // Add physics-enabled sprite for avatar
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 500, `avatar`);
        // Set the scale of the sprite
        this.avatar.setScale(2.2);
        // Set the depth of the character sprite to appear on top 
        this.avatar.setDepth(3);

        // Display bus
        this.addBus();

        // Setup collider between avatar and bus
        this.physics.add.overlap(this.avatar, this.bus, this.handleCollision, null, this);


        // Call the method to create animations
        this.createAnimations();
        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // // Create the particle emitter
        // this.createParticleEmitter();

        // Display bully
        this.addBully();

        // Setup collider between avatar and bullies
        this.physics.add.collider(this.avatar, this.bullies, this.handleBullyCollision, null, this);

        // Setup collider between bus and bullies
        for (const bully of this.bullies) {
            this.physics.add.collider(this.bus, bully, this.handleBusBullyCollision, null, this);
        }
        // Initialize bullies array
        this.bullies = [];
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

        // Play the animation
        this.avatar.play(`avatar-moving`);
        // Set the depth of the character sprite to appear on top 
        this.avatar.setDepth(1);
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


    handleCollision(avatar, bus) {
        // Stop bus movement
        bus.body.setVelocity(0);

        // Move the bus in the opposite direction
        bus.body.setVelocityX(-bus.body.velocity.x);
        bus.body.setVelocityY(-bus.body.velocity.y);

    }

    addBully() {
        // Define the number of bully
        const numBully = 4;
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
                    if (Phaser.Math.Distance.Between(x, y, bully.x, bully.y) < 50) {
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
        // this.showCollisionParticles();
        bully.destroy();
    }


    // createParticleEmitter() {
    //     // Create particle emitter
    //     console.log("Creating particle emitter...");
    //     this.particles = this.add.particles();

    //     // Define emitter configuration
    //     this.emitterConfig = {
    //         lifespan: 4000,
    //         speed: { min: 150, max: 250 },
    //         scale: { start: 1, end: 0 }, // Adjusted scale start value for better visibility
    //         gravityY: 150,
    //         blendMode: 'ADD',
    //         emitZone: { source: new Phaser.Geom.Circle(0, 0, 10) }
    //     };

    //     // Show collision particles at the fixed position
    //     this.showCollisionParticles();
    // }


    // showCollisionParticles() {
    //     // Emit particles at the fixed position
    //     console.log("Showing collision particles at fixed position (400, 300)...");

    //     const emitter = this.particles.createEmitter({
    //         x: 400,
    //         y: 300,
    //         ...this.emitterConfig
    //     });
    // }


    resetBusPositionAndVelocity() {
        // Reset bus position
        this.bus.x = 1000;
        // Reset bus velocity
        this.bus.setVelocityX(-200);
        this.bus.setVelocityY(0);
    }

}

