import Phaser from "phaser";
import { sceneEvents } from "../components/events/EventsController";


export class GameUi extends Phaser.Scene {
    constructor() {
        super({ key: 'game-ui' })
    }

    create() {
        const hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        hearts.createMultiple({
            key:'heartFull',
            setXY:{
                x:10,
                y:10,
                stepX:16
            },
            quantity:3 
        })

        sceneEvents.on('playerDamage',this.playerDamageHandler, this)
    }

    private playerDamageHandler(health:number){

    }
}