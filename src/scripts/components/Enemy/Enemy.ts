import Phaser from "phaser";

enum DIRECTION {
    RIGHT,
    LEFT,
    UP,
    DOWN
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    direction: DIRECTION = DIRECTION.RIGHT
    moveEvent: Phaser.Time.TimerEvent
    speed: number = 65
    constructor(public scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame)
        this.init()
    }

    init() {
        this.anims.play('enemy-run')
        this.scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.#onTileCollide, this)
        this.initSetDirTImer()
    }

    destroy(fromScene?: boolean | undefined): void {
        this.moveEvent.destroy()
        super.destroy(fromScene)
    }

    initSetDirTImer() {
        this.moveEvent = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                const newDir = Phaser.Math.Between(0, 3)
                this.direction = newDir
            },
            loop: true
        })
    }

    #onTileCollide(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
        const newDir = Phaser.Math.Between(0, 3)
        this.direction = newDir
    }

    preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
        switch (this.direction) {
            case DIRECTION.RIGHT:
                this.setVelocity(this.speed, 0)
                break
            case DIRECTION.LEFT:
                this.setVelocity(-this.speed, 0)
                break
            case DIRECTION.UP:
                this.setVelocity(0, -this.speed)
                break
            case DIRECTION.DOWN:
                this.setVelocity(0, this.speed)
        }
    }

}