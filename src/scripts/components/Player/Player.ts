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
    DAMAGE,
    DEAD,
    THROWSWORD
}

export class Player extends Phaser.Physics.Arcade.Sprite {

    private healthState = HealthState.IDLE
    private sword: Phaser.Physics.Arcade.Group
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

    setSword(sword: Phaser.Physics.Arcade.Group) {
        this.sword = sword
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
            this.healthState = HealthState.DEAD
            this.anims.play('character-faint')
                .addListener(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.setTint(0xffffff))

            this.setVelocity(0, 0)

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

    throwSword() {
        const parts = this.anims.currentAnim.key.split('-')
        const dir = parts[2]
        const vec = new Phaser.Math.Vector2(0, 0)
        switch (dir) {

            case 'up':
                vec.y = -1
                break
            case 'down':
                vec.y = 1
                break
            default:
            case 'side':
                if (this.flipX) {
                    vec.x = -1
                } else {
                    vec.x = 1
                }
                break
        }
        const angle = vec.angle()
        const sword = this.sword.get(this.x, this.y, 'sword') as Phaser.Physics.Arcade.Image
        sword.setRotation(angle + 0.7854)
        sword.setVelocity(vec.x * 300, vec.y * 300)
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if (this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD) return

        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.throwSword()
            return
        }

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



