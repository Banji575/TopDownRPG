import { AnimationController, typeAnimation } from "../components/Animation/AnimationController"
import { Enemy } from "../components/Enemy/Enemy"


export default class MainScene extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private character: Phaser.Physics.Arcade.Sprite
  private enemy: Phaser.GameObjects.Sprite
  private enemys: Phaser.Physics.Arcade.Group
  private enemySpeed: number
  private hitCount: number

  constructor() {
    super({ key: 'MainScene' })
    this.enemySpeed = 3

  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    const animController = new AnimationController(this.anims)
    animController.create(typeAnimation.enemy)
    animController.create(typeAnimation.character)

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


    this.cameras.main.startFollow(this.character, false, .6, .6)





    this.character.anims.play('character-run-side')


    this.enemys = this.physics.add.group({
      classType: Enemy,
      createCallback: go => {
        const enemy = go as Enemy
        enemy.body.onCollide = true
      }
    })



    this.enemys.get(100, 100, 'enemy')
    this.enemys.get(150, 150, 'enemy')

    this.physics.add.collider(barrierLayer, this.character)
    this.physics.add.collider(barrierLayer, this.enemys)

    this.physics.add.collider(this.character, this.enemys, this.hitDamage, undefined, this)


  }

  hitDamage(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const enemy = obj2 as Enemy

    const dx = this.character.x - enemy.x
    const dy = this.character.y - enemy.y
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(150)
    this.character.setVelocity(dir.x, dir.y)
    this.hitCount = 1
  }

  inputController() {


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



  update(t: number, dt: number) {
    if (this.hitCount > 0) {
      this.hitCount++

      if (this.hitCount >= 10) {
        this.hitCount = 0
      }
      return
    }
    this.inputController()
  }


}
