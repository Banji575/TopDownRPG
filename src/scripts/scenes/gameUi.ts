import Phaser from "phaser";
import { sceneEvents } from "../components/events/EventsController";


export class GameUi extends Phaser.Scene {
    hearts: Phaser.GameObjects.Group
    constructor() {
        super({ key: 'game-ui' })
    }

    create() {
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        this.hearts.createMultiple({
            key: 'heartFull',
            setXY: {
                x: 10,
                y: 10,
                stepX: 16
            },
            quantity: 3
        })

        sceneEvents.on('playerdamage', this.playerDamageHandler, this)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('playerdamage', this.playerDamageHandler, this)
        })
    }

    private playerDamageHandler(health: number) {
        console.log('player damage event')
        this.hearts.children.each((go, i) => {
            const heart = go as Phaser.GameObjects.Image
            if (i < health) {
                heart.setTexture('heartFull')
            } else {
                heart.setTexture('heartEmpty')
            }
        })
    }
}