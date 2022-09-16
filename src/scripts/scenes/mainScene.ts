export default class MainScene extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private character: Phaser.Physics.Arcade.Sprite
  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
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

    this.anims.create({
      key: 'character-idle-down',
      frames: [{ key: 'character', frame: 'run-down-1.png' }]
    })

    this.anims.create({
      key: 'character-idle-up',
      frames: [{ key: 'character', frame: 'run-up-1.png' }]
    })

    this.anims.create({
      key: 'character-idle-side',
      frames: [{ key: 'character', frame: 'run-side-1.png' }]
    })
    this.anims.create({
      key: 'character-run-down',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
      repeat: -1,
      frameRate: 13

    })
    this.anims.create({
      key: 'character-run-up',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
      repeat: -1,
      frameRate: 13

    })

    this.anims.create({
      key: 'character-run-side',
      frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
      repeat: -1,
      frameRate: 13

    })

    this.character.anims.play('character-run-side')
  }

  update(t: number, dt: number) {
    if (this.cursors.left.isDown) {
      this.character.setVelocity(-100, 0)
      this.character.anims.play('character-run-side', true)
      this.character.scaleX = -1
    } else if (this.cursors.right.isDown) {
      this.character.setVelocity(100, 0)
      this.character.anims.play('character-run-side', true)
      this.character.scaleX = 1
    } else if (this.cursors.up.isDown) {
      this.character.setVelocity(0, -100)
      this.character.anims.play('character-run-up', true)
    } else if (this.cursors.down.isDown) {
      this.character.setVelocity(0, 100)
      this.character.anims.play('character-run-down', true)
    } else {
      this.character.setVelocity(0, 0)
      this.character.anims.play('character-idle-down')
    }
  }
}
