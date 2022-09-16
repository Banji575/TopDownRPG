import { AnimationController, typeAnimation } from "../components/Animation/AnimationController"

export default class MainScene extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private character: Phaser.Physics.Arcade.Sprite
  private enemy: Phaser.GameObjects.Sprite

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    const animController = new AnimationController(this.anims)
    animController.create(typeAnimation.enemy)

    const map = this.make.tilemap({ key: 'cityDungeon' })
    const tileset = map.addTilesetImage('magecity', 'tiles')

    map.createLayer('ground', 'magecity')
    map.createLayer('groundElement', 'magecity')

    const barrierLayer = map.createLayer('barrier', 'magecity')
    barrierLayer.setCollisionByProperty({ collide: true })

    const debugGraphics = this.add.graphics().setAlpha(.2)
    barrierLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 243, 40),
      faceColor: new Phaser.Display.Color(49, 39, 37, 255)
    })

    this.character = this.physics.add.sprite(128, 128, 'character', 'run-down-1.png')
    this.character.body.setSize(this.character.width * .8, this.character.height * .8)

    this.physics.add.collider(barrierLayer, this.character)


    this.cameras.main.startFollow(this.character, false, .6, .6)

    //char idle down
    this.anims.create({
      key: 'character-idle-down',
      frames: [{ key: 'character', frame: 'run-down-1.png' }]
    })
    //char idle up
    this.anims.create({
      key: 'character-idle-up',
      frames: [{ key: 'character', frame: 'run-up-1.png' }]
    })
    // char idle-side
    this.anims.create({
      key: 'character-idle-side',
      frames: [{ key: 'character', frame: 'run-side-1.png' }]
    })
    //char run down
    this.anims.create({
      key: 'character-run-down',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
      repeat: -1,
      frameRate: 13
    })
    // char run up
    this.anims.create({
      key: 'character-run-up',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
      repeat: -1,
      frameRate: 13

    })
    //char run side
    this.anims.create({
      key: 'character-run-side',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
      repeat: -1,
      frameRate: 13

    })



    this.character.anims.play('character-run-side')



    this.enemy = this.add.sprite(100, 100, 'enemy', 'knight_m_hit_anim_f0.png')
    this.enemy.anims.play('enemy-run')

  }

  update(t: number, dt: number) {
    if (this.cursors.left.isDown) {
      this.character.setVelocity(-100, 0)
      this.character.anims.play('character-run-side', true)
      this.character.flipX = true
      // this.character.scaleX = -1
    } else if (this.cursors.right.isDown) {
      this.character.setVelocity(100, 0)
      this.character.anims.play('character-run-side', true)
      this.character.flipX = false
      // this.character.scaleX = 1
    } else if (this.cursors.up.isDown) {
      this.character.setVelocity(0, -100)
      this.character.anims.play('character-run-up', true)
    } else if (this.cursors.down.isDown) {
      this.character.setVelocity(0, 100)
      this.character.anims.play('character-run-down', true)
    } else {
      const parce = this.character.anims.currentAnim.key.split('-')
      parce[1] = 'idle'
      this.character.setVelocity(0, 0)
      this.character.anims.play(parce.join('-'), true)
    }
  }
}
