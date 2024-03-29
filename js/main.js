/**
 * 
Title: Bully Bash
Dorsa Zare

"Bully Bash" is a game where players control an avatar tasked with pushing bullies under a moving bus. Using keyboard arrows, players navigate through the streets, strategically pushing bullies. Whenever a bully is hit by the bus, a flower is planted. In the end, the main character realizes they have become the bully themselves.

*/

"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Bullying, Play]
};

let game = new Phaser.Game(config);