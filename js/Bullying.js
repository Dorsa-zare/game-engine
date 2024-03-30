class Bullying extends Phaser.Scene {
    constructor() {
        super({
            key: `bullying`
        });
    }

    create() {
        // Add the street image as the background
        const street = this.add.image(0, 0, 'school').setOrigin(0);
        street.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 530, `avatar`);
        this.avatar.setScale(2.5);
        this.avatar.setDepth(3);

        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set bounds for the avatar to stay within the canvas
        this.avatar.setCollideWorldBounds(true);

        // Add the bully image at the top of the screen
        const bullyImage = this.add.image(this.game.config.width / 2, 15, 'bully');
        bullyImage.setScale(2.7);
        this.avatar.setDepth(4);
        bullyImage.setAngle(180); // Rotate the image 180 degrees

        // Create bully words
        this.bullyWords = this.physics.add.group();

        // Generate bully words and repeat
        this.timerEvent = this.time.addEvent({
            delay: 1000, // Generate bully words every second
            callback: this.generateBullyWords,
            callbackScope: this,
            repeat: 20 // Repeat the event 20 times 
        });

        // Set collision detection between avatar and canvas bounds
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Handle Heart Image
        this.handleHeartImage();

        // Flag to track if heart is visible
        this.heartVisible = false;

        // Enable collisions between the avatar and bully words
        this.physics.add.overlap(this.avatar, this.bullyWords, this.showHeartImage, null, this);
       
        // Timer for checking if heart is visible after 25 seconds
        this.checkHeartTimer = this.time.addEvent({
            delay: 25000, // 25 seconds
            callback: this.checkHeartVisibility,
            callbackScope: this
        });
    }

    update() {
        // Movement controls for the avatar
        this.avatar.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(300);
        }
    }

    generateBullyWords() {
        // Create bully words with text
        const bullyPhrases = ['Ugly', 'Dumb', 'Loser', 'Weirdo', 'Freak', 'Nerd'];

        // Get the next bully word
        const nextBullyWord = bullyPhrases[this.bullyWordIndex];

        // If there are still words in the array
        if (nextBullyWord !== undefined) {
            const randomX = Phaser.Math.Between(0, this.game.config.width);

            // Create a bully word
            const bullyWord = this.add.text(randomX, 0, nextBullyWord, {
                font: "24px Arial",
                fill: "#ff0000", // Red color
                stroke: "#000000", // Black outline
                strokeThickness: 3 // Thickness of the outline
            });

            // Add the bully word to the group
            this.bullyWords.add(bullyWord);

            // Set initial y position for the bully word
            bullyWord.y = -30; // Start above the canvas

            // Enable physics for the bully word
            this.physics.world.enable(bullyWord);

            // Set gravity for the bully word
            bullyWord.body.setGravityY(100);

            // Set collide world bounds for the bully word
            bullyWord.body.setCollideWorldBounds(true);

            // Increase the index for the next word
            this.bullyWordIndex++;
        } else {
            // Reset the index to start from the beginning
            this.bullyWordIndex = 0;
        }
    }

    // Handle Heart Image
    handleHeartImage() {
        // Define the heart image and position it at the top right corner
        this.heart = this.add.image(this.game.config.width - 50, 40, 'heart');
        this.heart.setScale(0.08);
        this.heart.visible = false; // Initially hide the heart image
    }

    // Show Heart Image
    showHeartImage(avatar, bullyWord) {
        // Show the heart image if it's not already visible
        if (!this.heartVisible) {
            this.heart.visible = true;
            this.heartVisible = true;
        }
    }
    // Check if heart is visible after 20 seconds
    checkHeartVisibility() {
        if (this.heartVisible) {
            // Display text indicating the heart has been broken
            const brokenHeartText = this.add.text(this.game.config.width / 2, 325, "Your heart has been broken by the bullies.\nYou will have the chance to get revenge now.", {
                font: "20px Arial",
                fill: "#ff0000", // Red color
                align: "center"
            });
            brokenHeartText.setOrigin(0.5);
        }
    }

}
