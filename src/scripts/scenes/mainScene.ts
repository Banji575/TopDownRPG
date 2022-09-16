export default class MainScene extends Phaser.Scene {


  constructor() {
    super({ key: 'MainScene' })
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
  }

  update() {

  }
}
