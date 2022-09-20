import Phaser from "phaser";

export class Chest extends Phaser.Physics.Arcade.Sprite {
    isOpened: boolean = false
    get coins() {
        if (this.isOpened) return
        return Phaser.Math.Between(50, 200)
    }
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame)
        this.init()
    }

    init() {
        this.play('chest-close')
      //  this.scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
    }

    open() {
        this.play('chest-open')
    }
}