export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/magecity.png')
    this.load.tilemapTiledJSON('cityDungeon', 'assets/tiles/cityMap..json')

    this.load.atlas('player', 'assets/atkas/cracters/player.json', 'assets/atkas/cracters/player.png')
  }

  create() {
    this.scene.start('MainScene')
  }
}
