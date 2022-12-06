class Player {
    constructor(game, ctx, CANVAS_WIDTH, CANVAS_HEIGHT){
        this.gameframe = 0
        this.ctx = ctx
        this.CANVAS_WIDTH = CANVAS_WIDTH
        this.CANVAS_HEIGHT = CANVAS_HEIGHT
        this.spriteWidth = 575
        this.spriteHeight = 523
        this.game = game;
        //player height
        this.width = 150;
        this.height = 150
        this.position = {
            x: 100,
            y: 250
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1.9
        this.image = document.getElementById('player')
        this.speed = 0
        this.maxSpeed = 10;
    }
    update(input){
        this.draw()
        console.log(this.game.scrollOffset)
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
        const staggerFrames = 5;
        const spriteAnimations = [];
        const animationStates = [
            {
                name: 'idle',
                frames: 7,
            },
            {
                name: 'jump',
                frames: 7,
            },
            {
                name: 'fall',
                frames: 7,
            },   {
                name: 'run',
                frames: 9,
            },
            {
                name: 'dizzy',
                frames: 5,
            },
            {
                name: 'sit',
                frames: 5,
            },
            {
                name: 'roll',
                frames: 7,
            },
            {
                name: 'bite',
                frames: 7,
            },
            {
                name: 'ko',
                frames: 10,
            },
            {
                name: 'gethit',
                frames: 4,
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
        // console.log(spriteAnimations)
        const playerImage = new Image();
        playerImage.src = './src/images/shadow_dog.png'
        let position = Math.floor(this.gameframe / staggerFrames) % spriteAnimations[playerState].loc.length
        let frameX = this.spriteWidth * position
        let frameY = spriteAnimations[playerState].loc[position].y
        this.ctx.drawImage(playerImage, frameX, frameY, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height)
        this.gameframe++;
    }

    onGround(){
        return this.y >= this.game.height - this.height
    }
}

export default Player
