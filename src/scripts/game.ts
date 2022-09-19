import 'phaser'
import { GameUi } from './scenes/gameUi'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    zoom: 1.5,
    parent: 'phaser-game',
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, GameUi],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,

    }
  }

}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
