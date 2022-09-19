import Phaser from 'phaser'

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame: string) {
        super(scene, x, y, texture, frame)
        this.#init()
    }

    #init() {
        this.anims.play('character-run-side')
    }



}

Phaser.GameObjects.GameObjectFactory.register()