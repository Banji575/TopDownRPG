export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/magecity.png')
    this.load.tilemapTiledJSON('cityDungeon', 'assets/tiles/cityMap..json')

    this.load.atlas('character', 'assets/characters/characters.png', 'assets/characters/characters.json')
 
  }

  create() {
    this.scene.start('MainScene')
  }
}
