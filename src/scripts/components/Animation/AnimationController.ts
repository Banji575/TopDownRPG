export enum typeAnimation {
    character = 'character',
    enemy = 'enemy',
    chest = 'chest'
}

export class AnimationController {
    constructor(public anims: Phaser.Animations.AnimationManager) {

    }

    create(type: typeAnimation) {
        switch (type) {
            case typeAnimation.character:
                return this.#characterAnims()
            case typeAnimation.enemy:
                return this.#enemyAnims()
            case typeAnimation.chest:
                return this.#chestAnims()

        }
    }

    #characterAnims() {
        //char idle down
        this.anims.create({
            key: 'character-idle-down',
            frames: [{ key: 'character', frame: 'run-down-1.png' }]
        })
        //char idle up
        this.anims.create({
            key: 'character-idle-up',
            frames: [{ key: 'character', frame: 'run-up-1.png' }]
        })
        // char idle-side
        this.anims.create({
            key: 'character-idle-side',
            frames: [{ key: 'character', frame: 'run-side-1.png' }]
        })
        //char run down
        this.anims.create({
            key: 'character-run-down',
            frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
            repeat: -1,
            frameRate: 13
        })
        // char run up
        this.anims.create({
            key: 'character-run-up',
            frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
            repeat: -1,
            frameRate: 13
        })
        //char idle down
        this.anims.create({
            key: 'character-idle-down',
            frames: [{ key: 'character', frame: 'run-down-1.png' }]
        })
        //char idle up
        this.anims.create({
            key: 'character-idle-up',
            frames: [{ key: 'character', frame: 'run-up-1.png' }]
        })
        // char idle-side
        this.anims.create({
            key: 'character-idle-side',
            frames: [{ key: 'character', frame: 'run-side-1.png' }]
        })
        //char run down
        this.anims.create({
            key: 'character-run-down',
            frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
            repeat: -1,
            frameRate: 13
        })
        // char run up
        this.anims.create({
            key: 'character-run-up',
            frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
            repeat: -1,
            frameRate: 13

        })
        //char run side
        this.anims.create({
            key: 'character-run-side',
            frames: this.anims.generateFrameNames('character', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
            repeat: -1,
            frameRate: 13
        })

        this.anims.create({
            key: 'character-faint',
            frames: this.anims.generateFrameNames('character', { start: 1, end: 4, prefix: 'faint-', suffix: '.png' }),
            repeat: 0,
            frameRate: 13

        })

    }

    #enemyAnims() {
        //enemy idle
        this.anims.create({
            key: 'enemy-idle',
            frames: [{ key: 'enemy', frame: "knight_f_run_anim_f3.png" }],
            repeat: -1
        })


        this.anims.create({
            key: 'enemy-run',
            frames: this.anims.generateFrameNames('enemy', { start: 0, end: 6, prefix: 'knight_m_run_anim_f', suffix: '.png' }),
            repeat: -1,
            frameRate: 6

        })
    }

    #chestAnims() {
        this.anims.create({
            key: 'chest-open',
            frames: this.anims.generateFrameNames('treasure', { start: 0, end: 1, prefix: 'chest2-', suffix: '.png' })
        })

        this.anims.create({
            key: 'chest-closed',
            frames: this.anims.generateFrameNames('treasure', { start: 1, end: 0, prefix: 'chest2-', suffix: '.png' })
        })
    }
}