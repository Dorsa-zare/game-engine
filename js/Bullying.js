class Bullying extends Phaser.Scene {
    constructor() {
        super({
            key: `bullying`
        });
    }

    create() {
        // Add code here to create the scene
        this.add.rectangle(400, 300, 800, 600, 0x0000ff); // Add blue background
    }

    update() {
        // Add code here for scene updates
    }
}
