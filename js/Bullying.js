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
}
