//canvas display hidden until button is hit, then display block
// bindKeys(),
//end game, reverse binding keys
//make it where the start of platform makes you fall
//platform tomorrow, blackhole
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
        this.backgroundlayer1.src = '../src/images/4/1.png'
        this.backgroundlayer2 = new Image();
        this.backgroundlayer2.src = '../src/images/4/2.png'
        this.backgroundlayer3 = new Image();
        this.backgroundlayer3.src = '../src/images/4/3.png'
        this.backgroundlayer4 = new Image();
        this.backgroundlayer4.src = '../src/images/4/4.png'
        this.platforms = [
            new Platform({
                x:0, y: 500
            }, this.ctx),
            new Platform({
                x:0, y: -31
            }, this.ctx)
            , new Platform({
                x: 0, y: -30
            },this.ctx), new Platform({
                x: 300, y: 300
            },this.ctx), new Platform({
                x: 2000, y: 350
            },this.ctx)
        ]
        this.keys = {
            right: {
                pressed: false
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
                    this.player.velocity.y = -20
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
    this.ctx.clearRect(0, 0, this.CANVAS_HEIGHT, this.CANVAS_WIDTH)
    const layer1 = new Layer(this.backgroundlayer1, 1, this.gameSpeed, this.ctx)
    const layer2 = new Layer(this.backgroundlayer2, 1, this.gameSpeed, this.ctx)
    const layer3 = new Layer(this.backgroundlayer3, 1, this.gameSpeed, this.ctx)
    const layer4 = new Layer(this.backgroundlayer4, 1, this.gameSpeed, this.ctx)
    layer1.update();
    layer1.draw();
    layer2.update();
    layer2.draw();
    layer3.update();
    layer3.draw();
    layer4.update();
    layer4.draw();
    this.platforms.forEach(platform => {
        platform.draw()
    })
    if (this.player.position.y >= 600){
        [this.player.position.x, this.player.position.y] = [100, 250]
            this.platforms = [
                new Platform({
                    x:0, y: 500
                }, this.ctx),
                new Platform({
                    x:0, y: -31
                }, this.ctx)
                , new Platform({
                    x: 0, y: -30
                },this.ctx), new Platform({
                    x: 300, y: 300
                },this.ctx), new Platform({
                    x: 2000, y: 350
                },this.ctx)
            ]
        this.scrollOffset = 0
    }
    this.player.update()
    requestAnimationFrame(this.animate)
    //makes platforms scroll
    if (this.keys.right.pressed && this.player.position.x < 100){
        this.player.velocity.x = 5
    }else if(this.keys.left.pressed && this.player.position.x > 100){
        this.player.velocity.x = -5
    }else if (this.keys.space.pressed && this.player.position.x > 100){
        this.player.velocity.y += 10
    }else{
        this.player.velocity.x = 0
        if (this.keys.right.pressed){
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
        if (this.player.position.x <= platform.position.x + (platform.width - 45) &&
            this.player.position.x + this.player.width >= platform.position.x &&
            this.player.position.y < platform.position.y + platform.height &&
            this.player.position.y + this.player.height >= platform.position.y) {
             // collision detected!
             this.player.velocity.y = 0
            //  this.player.velocity.x = 0
        }
    })
    //win condition
    if (this.scrollOffset >= 1090){
        console.log(this.scrollOffset)
        // alert('you win!')
    }
    // lose condition
    if (this.player.position.y > this.CANVAS_HEIGHT){
        console.log('you lose')
    }
    if (this.scrollOffset >= 0){
        let score = this.scrollOffset
        document.getElementById('output').innerHTML=score
    }else{
        score = 0
    }
}

}

export default Game
