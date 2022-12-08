class Player {
    constructor(game, ctx, CANVAS_WIDTH, CANVAS_HEIGHT){
        this.gameframe = 0
        this.ctx = ctx
        this.CANVAS_WIDTH = CANVAS_WIDTH
        this.CANVAS_HEIGHT = CANVAS_HEIGHT
        this.spriteWidth = 50
        this.spriteHeight = 38
        this.game = game;
        //player height
        this.width = 125;
        this.height = 125
        this.position = {
            x: 100,
            y: 375
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 2
        this.image = document.getElementById('player')
        this.speed = 0
        this.maxSpeed = 10;
    }
    update(input){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        // console.log(this.position.x)
        if (this.position.y + this.height + this.velocity.y <= this.CANVAS_HEIGHT){
            this.velocity.y += this.gravity
        }
    }
    draw(context){
        const playerState = 'run'
        //changes sprite frame
        const staggerFrames = 7;
        const spriteAnimations = [];
        const animationStates = [
            {
                name: 'idle',
                frames: 7,
            },
            {
                name: 'run',
                frames: 7,
            },
            {
                name: 'jump',
                frames: 7,
            },   {
                name: 'fall',
                frames: 7,
            },
            {
                name: 'standup',
                frames: 7,
            },
            {
                name: 'sword',
                frames: 7,
            },
            {
                name: 'slash',
                frames: 7,
            },
            {
                name: 'slashMoveRight',
                frames: 7,
            },
            {
                name: 'prepareAttack',
                frames: 7,
            },
            {
                name: 'hit',
                frames: 7,
            },
            {
                name: 'dash',
                frames: 2,
            }
        ];
        animationStates.forEach((state, index)=>{
            let frames = {
                loc: [],
            }
            for (let j = 0; j < state.frames; j++){
                let positionX = j * this.spriteWidth
                let positionY = index * this.spriteHeight
                frames.loc.push({x: positionX, y: positionY})
            }
            spriteAnimations[state.name] = frames;
        })
        const playerImage = new Image();
        playerImage.src = './src/images/adventurer-Sheet.png'
        const blackholeImg = new Image()
        blackholeImg.src = './src/images/blackHole.png'
        let position = Math.floor(this.gameframe / staggerFrames) % spriteAnimations[playerState].loc.length
        let frameX = this.spriteWidth * position
        let frameY = spriteAnimations[playerState].loc[position].y
        // this.ctx.drawImage(blackholeImg, frameX, frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height)
        this.ctx.drawImage(playerImage, frameX, frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height)
        this.gameframe++;
    }

    onGround(){
        return this.y >= this.game.height - this.height
    }
}

export default Player
