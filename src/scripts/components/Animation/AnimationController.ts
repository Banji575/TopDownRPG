export enum typeAnimation {
    character = 'character',
    enemy = 'enemy'
}

export class AnimationController {
    constructor(public anim: Phaser.Animations.AnimationManager) {

    }

    create(type: typeAnimation) {
        switch (type) {
            case typeAnimation.character:
                return this.#characterAnims()
            case typeAnimation.enemy:
                return this.#enemyAnims()
        }
    }

    #characterAnims() {

    }

    #enemyAnims() {
        //enemy idle
        this.anim.create({
            key: 'enemy-idle',
            frames: [{ key: 'enemy', frame: "knight_f_run_anim_f3.png" }],
            repeat: -1
        })


        this.anim.create({
            key: 'enemy-run',
            frames: this.anim.generateFrameNames('enemy', { start: 0, end: 6, prefix: 'knight_m_run_anim_f', suffix: '.png' }),
            repeat: -1,
            frameRate: 6

        })
    }
}