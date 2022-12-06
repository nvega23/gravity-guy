import Player from './player'
import Platform from './platforms'
import Layer from './layers'

class Game{
    constructor(ctx, CANVAS_WIDTH, CANVAS_HEIGHT){
        this.CANVAS_WIDTH = CANVAS_WIDTH
        this.CANVAS_HEIGHT = CANVAS_HEIGHT
        this.scrollOffset = 0
        this.ctx = ctx
        this.player = new Player(this, ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.gameSpeed = 5
        this.backgroundlayer1 = new Image();//same as getElementByImage()
        this.backgroundlayer1.src = '../src/images/sun.png'
        console.log(this.backgroundlayer1.src)
        // this.backgroundlayer2 = new Image();
        // this.backgroundlayer2.src = '../src/images/2.png'
        // this.backgroundlayer3 = new Image();
        // this.backgroundlayer3.src = '../src/images/3.png'
        // this.backgroundlayer4 = new Image();
        // this.backgroundlayer4.src = '../src/images/4.png'
        this.platforms = [
            new Platform({
                x:0, y: 500
            }, this.ctx),
            , new Platform({
                x: 550, y: 500
            },this.ctx), new Platform({
                x: 1400, y: 500
            },this.ctx), new Platform({
                x: 2000, y: 350
            },this.ctx)
        ]
        this.keys = {
            right: {
                pressed: true
            },
            left: {
                pressed: false
            },
            space: {
                pressed: false
            }
        }
        this.animate = this.animate.bind(this)
        this.animate()
        this.bindKeys()
    }
    bindKeys(){
        //keyCode is the number that you get when you press a key in the console
        window.addEventListener("keydown", ({keyCode}) => {
            console.log(keyCode)
            switch(keyCode) {
                case 68:
                    console.log("right")
                    this.player.velocity.x = 1
                    this.keys.right.pressed = true
                    break
                case 65:
                    console.log("left")
                    this.keys.left.pressed = true
                    this.player.velocity.x = -1
                    break
                case 87:
                    console.log("up")
                    this.player.velocity.y -= 20
                    break
                case 83:
                    console.log("down")
                    this.player.velocity.y += 20
                    break
                case 32:
                    console.log("space")
                    this.keys.space.pressed = true
                    this.player.velocity.x += 10
                    break
            }
            console.log(this.keys.right.pressed)
        })
        window.addEventListener("keyup", ({keyCode}) => {
            // console.log(keyCode)
            switch(keyCode) {
                case 68:
                    console.log("right")
                    this.keys.right.pressed = false
                    this.player.velocity.x = 0
                    break
                case 65:
                    console.log("left")
                    this.keys.left.pressed = false
                    this.player.velocity.x = 0
                    break
                case 87:
                    console.log("up")
                    this.player.velocity.y -= 20
                    break
                case 83:
                    console.log("down")
                    this.player.velocity.y += 20
                    break
                case 32:
                    console.log("space")
                    this.keys.space.pressed = false
                    this.player.gravity = 0
                    break
            }
            console.log(this.keys.right.pressed)
        })

    }
    animate() {
    // const layer1 = new Layer(this.backgroundlayer1, 1, this.gameSpeed, this.ctx)
    // const layer2 = new Layer(this.backgroundlayer2, 1, this.gameSpeed, this.ctx)
    // const layer3 = new Layer(this.backgroundlayer3, 1, this.gameSpeed, this.ctx)
    // const layer4 = new Layer(this.backgroundlayer4, 1, this.gameSpeed, this.ctx)
    this.ctx.clearRect(0, 0, this.CANVAS_HEIGHT, this.CANVAS_WIDTH)
    // layer1.update();
    // layer1.draw();
    // layer2.update();
    // layer2.draw();
    // layer3.update();
    // layer3.draw();
    // layer4.update();
    // layer4.draw();
    this.player.velocity.x = 1.5
    this.platforms.forEach(platform => {
        platform.draw()
    })
    if (this.player.position.y >= 600){
        [this.player.position.x, this.player.position.y] = [100, 250]
            this.platforms = [
                new Platform({
                    x:0, y: 500
                }, this.ctx),
                , new Platform({
                    x: 550, y: 500
                },this.ctx), new Platform({
                    x: 1400, y: 500
                },this.ctx), new Platform({
                    x: 2000, y: 350
                },this.ctx)
            ]
    }
    this.player.update()
    requestAnimationFrame(this.animate)

    if (this.keys.right.pressed && this.player.position.x < 400){
        this.player.velocity.x = 5
    }else if(this.keys.left.pressed && this.player.position.x > 100){
        this.player.velocity.x = -5
    }else if (this.keys.space.pressed && this.player.position.x > 100){
        this.player.velocity.y += 10
    }else{
        this.player.velocity.x = 0
        if (this.keys.right.pressed){
            //makes platforms scroll
            this.scrollOffset += 5
            this.platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (this.keys.left.pressed){
            this.scrollOffset -= 5
            this.platforms.forEach(platform => {
                platform.position.x += 5
            })
        } else if (this.keys.right.pressed){
            //makes this.platforms scroll
            this.scrollOffset += 5
            this.platforms.forEach(platform => {
                platform.position.x -= 5
            })
        }
        // console.log(this.scrollOffset)
    }

    // platform collision detecion
    this.platforms.forEach(platform => {
    if (this.player.position.y + this.player.height <= platform.position.y &&
        this.player.position.y + this.player.height + this.player.velocity.y
        >= platform.position.y && this.player.position.x + this.player.width
        >= platform.position.x && this.player.position.x <= platform.position.x
        + (platform.width - 45)){
            this.player.velocity.y = 0
        }
    })
    //win condition
    if (this.scrollOffset > 2190){
        console.log("you Win")
    }
    // lose condition
    if (this.player.position.y > this.CANVAS_HEIGHT){
        console.log('you lose')
    }
}

}

export default Game
