import Phaser from "phaser";

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            player(x: number, y: number, texture: string, frame: string): Player
        }
    }
}

enum HealthState {
    IDLE,
    DAMAGE
}

export class Player extends Phaser.Physics.Arcade.Sprite {

    private healthState = HealthState.IDLE
    private damageTime = 0
    private _health = 3

    get health() {
        return this._health
    }

    constructor(public scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame)
        this.init()
    }
    init() {
        this.anims.play('character-run-side')
    }

    handleDamage(dir: Phaser.Math.Vector2) {
        if (this._health <= 0) return

        if (this.healthState === HealthState.DAMAGE) return

        this.setVelocity(dir.x, dir.y)

        this.setTint(0xff0000)
        this.healthState = HealthState.DAMAGE
        this.damageTime = 0

        --this._health

        if (this._health <= 0) {

        }
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
        switch (this.healthState) {
            case HealthState.IDLE:
                break

            case HealthState.DAMAGE:
                this.damageTime += delta
                if (this.damageTime >= 250) {
                    this.healthState = HealthState.IDLE
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if (this.healthState === HealthState.DAMAGE) return

        if (cursors.left.isDown) {
            this.setVelocity(-100, 0)
            this.anims.play('character-run-side', true)
            this.flipX = true

            // this.character.scaleX = -1
        } else if (cursors.right.isDown) {
            this.setVelocity(100, 0)
            this.anims.play('character-run-side', true)
            this.flipX = false
            // this.character.scaleX = 1
        } else if (cursors.up.isDown) {
            this.setVelocity(0, -100)
            this.anims.play('character-run-up', true)
        } else if (cursors.down.isDown) {
            this.setVelocity(0, 100)
            this.anims.play('character-run-down', true)
        } else {
            const parce = this.anims.currentAnim.key.split('-')
            parce[1] = 'idle'
            this.setVelocity(0, 0)
            this.anims.play(parce.join('-'), true)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('player', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame: string) {
    var sprite = new Player(this.scene, x, y, texture, frame)

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.body.setSize(sprite.width * .8, sprite.height * .8)
    return sprite;
})