import { AnimationController, typeAnimation } from "../components/Animation/AnimationController"
import { Enemy } from "../components/Enemy/Enemy"
import '../components/Player/Player'
import { Player } from "../components/Player/Player"

import { sceneEvents } from "../components/events/EventsController"
import { Chest } from "../components/chests/Chest"

export default class MainScene extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private character: Player
  private enemys: Phaser.Physics.Arcade.Group
  private playerEnemyCollider: Phaser.Physics.Arcade.Collider
  private sword: Phaser.Physics.Arcade.Group
  private chests: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.scene.run('game-ui')
    const animController = new AnimationController(this.anims)
    animController.create(typeAnimation.enemy)
    animController.create(typeAnimation.character)
    animController.create(typeAnimation.chest)

    const { barrierLayer } = this.createMap()
    this.createDebug(barrierLayer)

    const { sword } = this.createSword()
    this.sword = sword

    this.enemys = this.physics.add.group({
      classType: Enemy,
      createCallback: go => {
        const enemy = go as Enemy
        enemy.body.onCollide = true
      }
    })

    // const chest = this.add.sprite(130, 130, 'treasure', 'chest2-0.png')
    // this.time.delayedCall(2000, ()=>{
    //   console.log(chest.anims.play('chest-open'))
    // chest.anims.play('chest-open')

    // },undefined, this)


    this.character = this.createCharacter()
    this.character.setSword(sword)

    this.enemys.get(200, 200, 'enemy')
    this.enemys.get(250, 250, 'enemy')

    this.physics.add.collider(barrierLayer, this.character)
    this.physics.add.collider(barrierLayer, this.enemys)
    this.physics.add.collider(sword, barrierLayer, (obj1) => this.killAndHide(obj1), undefined, this)
    this.physics.add.collider(sword, this.enemys, (obj1, obj2) => {
      this.killAndHide(obj1)
      this.killAndHide(obj2)
    }, undefined, this)
    this.physics.add.collider(this.character, this.chests, this.playerChestCollisionHandler, undefined, this)
    this.playerEnemyCollider = this.physics.add.collider(this.character, this.enemys, this.hitDamage, undefined, this)
    // this.physics.add.collider(sword, this.enemys, ()=>console.log('hello world'), undefined, this)

  }

  playerChestCollisionHandler(obj1, obj2) {
    const character = obj1 as Player
    character.setChest(obj2)
  }

  killAndHide(obj: Phaser.GameObjects.GameObject) {
    obj.setActive(false)
    obj.destroy()

  }

  hitDamage(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const enemy = obj2 as Enemy

    const dx = this.character.x - enemy.x
    const dy = this.character.y - enemy.y
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(150)
    this.character.handleDamage(dir)
    sceneEvents.emit('playerdamage', this.character.health)

    if (this.character.health <= 0) {
      this.playerEnemyCollider.destroy()
    }
  }

  createCharacter(): Player {
    const character = this.add.player(450, 350, 'character', 'run-down-1.png')
    this.cameras.main.startFollow(character, false, .6, .6)
    return character
  }

  createMap() {
    const map = this.make.tilemap({ key: 'cityDungeon' })
    const tileset = map.addTilesetImage('magecity', 'tiles')

    map.createLayer('ground', 'magecity')
    map.createLayer('groundElement', 'magecity')

    const barrierLayer = map.createLayer('barrier', 'magecity')
    barrierLayer.setCollisionByProperty({ collide: true })

    const chestLayer = map.getObjectLayer('chest')

    this.chests = this.physics.add.group({
      classType: Chest
    })

    chestLayer.objects.forEach(chest => {
      const chestObj = this.chests.get(chest.x, chest.y, 'treasure', 'chest2-0.png') as Phaser.Physics.Arcade.Sprite
      chestObj.setOrigin(-.5, .5)

    })
    return { barrierLayer }
  }



  createDebug(layer: Phaser.Tilemaps.TilemapLayer) {
    const debugGraphics = this.add.graphics().setAlpha(.2)
    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 243, 40),
      faceColor: new Phaser.Display.Color(49, 39, 37, 255)
    })
  }

  createSword() {
    const sword = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image
    })

    return { sword }
  }

  update(t: number, dt: number) {
    this.character.update(this.cursors)
  }


}
