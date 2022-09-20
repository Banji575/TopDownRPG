export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/magecity.png')
    this.load.tilemapTiledJSON('cityDungeon', 'assets/tiles/cityMap..json')

    this.load.atlas('character', 'assets/characters/characters.png', 'assets/characters/characters.json')
    this.load.atlas('enemy', 'assets/enemy/enemy.png', 'assets/enemy/enemy.json')

    this.load.image('heartFull', 'assets/img/heartFull.png')
    this.load.image('heartEmpty', 'assets/img/heartEmpty.png')

    this.load.atlas('treasure', 'assets/atkas/treasure/treasure.png', 'assets/atkas/treasure/treasure.json')

    this.load.image('sword', 'assets/img/sword.png')

  }

  create() {
    this.scene.start('MainScene')
  }
}
