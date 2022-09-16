import Phaser from "phaser";

export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(public scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame)
    }

}