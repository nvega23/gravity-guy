class blackHole {
    constructor(ctx, CANVAS_WIDTH, CANVAS_HEIGHT){
        this.gameframe = 0
        this.ctx = ctx
        this.CANVAS_WIDTH = CANVAS_WIDTH
        this.CANVAS_HEIGHT = CANVAS_HEIGHT
        this.spriteWidth = 150
        this.spriteHeight = 150
        //player height
        this.width = 525;
        this.height = 725
        this.position = {
            x: -500,
            y: -150
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 2
        this.speed = 0
        this.maxSpeed = 10;
    }
    update(input){
        this.draw()
        this.position.x += 5
    }
    draw(context){
        const playerState = 'run'
        //changes sprite frame
        const staggerFrames = 4;
        const spriteAnimations = [];
        const animationStates = [
            {
                name: 'idle',
                frames: 4,
            },
            {
                name: 'run',
                frames: 2,
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
        const blackholeImg = new Image()
        blackholeImg.src = './images/blackHole.png'
        let position = Math.floor(this.gameframe / staggerFrames) % spriteAnimations[playerState].loc.length
        let frameX = this.spriteWidth * position
        let frameY = spriteAnimations[playerState].loc[position].y
        this.ctx.drawImage(blackholeImg, frameX, frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height)
        this.gameframe++;
    }
    onGround(){
        return this.y >= this.game.height - this.height
    }
}

export default blackHole

const enemy = new blackHole();
