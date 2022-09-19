import { AnimationController, typeAnimation } from "../components/Animation/AnimationController"
import { Enemy } from "../components/Enemy/Enemy"
import '../components/Player/Player'
import { Player } from "../components/Player/Player"

import { sceneEvents } from "../components/events/EventsController"

export default class MainScene extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private character: Player
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
    this.scene.run('game-ui')
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

    this.character = this.add.player(128, 128, 'character', 'run-down-1.png')
    this.cameras.main.startFollow(this.character, false, .6, .6)

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
    this.character.handleDamage(dir)
    sceneEvents.emit('playerdamage', this.character.health)
  }




  update(t: number, dt: number) {
    // if (this.hitCount > 0) {
    //   this.hitCount++

    //   if (this.hitCount >= 10) {
    //     this.hitCount = 0
    //   }
    //   return
    // }

    this.character.update(this.cursors)
  }


}
