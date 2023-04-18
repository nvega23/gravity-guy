import Player from './player'
import Platform from './platforms'
import Layer from './layers'
import blackHole from './blackHole.js'

class Game{
    constructor(ctx, CANVAS_WIDTH, CANVAS_HEIGHT){
        this.CANVAS_WIDTH = CANVAS_WIDTH
        this.CANVAS_HEIGHT = CANVAS_HEIGHT
        this.scrollOffset = 0
        this.ctx = ctx
        this.player = new Player(this, ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.blackHole = new blackHole(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.score = 0
        this.gameSpeed = 5
        this.backgroundlayer1 = new Image();//same as getElementByImage()
        this.backgroundlayer1.src = './images/nature.jpg'
        this.backgroundlayer2 = new Image();
        this.backgroundlayer2.src = './images/nature.jpg'
        this.backgroundlayer3 = new Image();
        this.backgroundlayer3.src = './images/nature.jpg'
        this.backgroundlayer4 = new Image();
        this.backgroundlayer4.src = './images/nature.jpg'
        this.platforms = [
            new Platform({
                x:0, y: 500
            }, this.ctx),
            new Platform({
                x:0, y: -31
            }, this.ctx)
            , new Platform({
                x: 200, y: 500
            },this.ctx),
            new Platform({
                x: 500, y: 350
            },this.ctx)
            , new Platform({
                x: 800, y: -31
            },this.ctx)
            , new Platform({
                x: 1000, y: -31
            },this.ctx)
            , new Platform({
                x: 1500, y: -31 //dce
            },this.ctx)
            , new Platform({
                x: 1500, y: 500
            },this.ctx)
            , new Platform({
                x: 1300, y: 500
            },this.ctx)
            , new Platform({
                x: 1800, y: 350//odd one
            },this.ctx), //new
            new Platform({
                x:2150, y: 500
            }, this.ctx),
            new Platform({
                x:2150, y: -31
            }, this.ctx)
            , new Platform({
                x: 2400, y: -31
            },this.ctx),
            new Platform({
                x: 2500, y: 350
            },this.ctx),
            new Platform({
                x: 2500, y: -31
            },this.ctx)
            , new Platform({
                x: 2600, y: -31
            },this.ctx)
            , new Platform({
                x: 2800, y: 500//last
            },this.ctx)
            , new Platform({
                x: 3000, y: 500//last
            },this.ctx)
            , new Platform({
                x: 2500, y: -31
            },this.ctx)
            , new Platform({
                x: 2500, y: 500
            },this.ctx)
            , new Platform({
                x: 2300, y: 500
            },this.ctx)
            , new Platform({
                x: 2500, y: 350
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
            switch(keyCode) {
                case 68:
                    this.player.velocity.x = 1
                    this.keys.right.pressed = true
                    break
                case 65:
                    this.keys.left.pressed = true
                    this.player.velocity.x = -1
                    break
                case 87:
                    this.player.velocity.y -= 20
                    break
                case 83:
                    this.player.velocity.y += 20
                    break
                case 32:
                    this.keys.space.pressed = true
                    this.player.velocity.y = -20
                    break
            }
        })
        window.addEventListener("keyup", ({keyCode}) => {
            switch(keyCode) {
                case 68:
                    this.keys.right.pressed = false
                    this.player.velocity.x = 0
                    break
                case 65:
                    this.keys.left.pressed = false
                    this.player.velocity.x = 0
                    break
                case 87:
                    this.player.velocity.y -= 20
                    break
                case 83:
                    this.player.velocity.y += 20
                    break
                case 32:
                    this.keys.space.pressed = false
                    this.player.gravity = 0
                    break
            }
        })

    }
    reset(){
            [this.player.position.x, this.player.position.y] = [100, 320]
                this.platforms = [
                    new Platform({
                        x:0, y: 500
                    }, this.ctx),
                    new Platform({
                        x:0, y: -31
                    }, this.ctx)
                    , new Platform({
                        x: 200, y: 500
                    },this.ctx),
                    new Platform({
                        x: 500, y: 350
                    },this.ctx)
                    , new Platform({
                        x: 800, y: -31
                    },this.ctx)
                    , new Platform({
                        x: 1000, y: -31
                    },this.ctx)
                    , new Platform({
                        x: 1500, y: -31 //dce
                    },this.ctx)
                    , new Platform({
                        x: 1500, y: 500
                    },this.ctx)
                    , new Platform({
                        x: 1300, y: 500
                    },this.ctx)
                    , new Platform({
                        x: 1800, y: 350
                    },this.ctx), //new
                    new Platform({
                        x:2150, y: 500
                    }, this.ctx),
                    new Platform({
                        x:2150, y: -31
                    }, this.ctx)
                    , new Platform({
                        x: 2400, y: -31
                    },this.ctx),
                    new Platform({
                        x: 2500, y: 350
                    },this.ctx),
                    new Platform({
                        x: 2500, y: -31
                    },this.ctx)
                    , new Platform({
                        x: 2600, y: -31
                    },this.ctx)
                    , new Platform({
                        x: 2800, y: 500
                    },this.ctx)
                    , new Platform({
                        x: 3000, y: 500
                    },this.ctx)
                    , new Platform({
                        x: 2500, y: -31 //dce
                    },this.ctx)
                    , new Platform({
                        x: 2500, y: 500
                    },this.ctx)
                    , new Platform({
                        x: 2300, y: 500
                    },this.ctx)
                    , new Platform({
                        x: 2500, y: 350
                    },this.ctx)
                ]
            this.blackHole.position.x = -500
            this.scrollOffset = 0
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
        this.reset()
    }
    this.blackHole.update()
    this.player.update()
    const gameRun = requestAnimationFrame(this.animate);

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
            this.blackHole.position.x -= 5
        } else if (this.keys.left.pressed){
            this.scrollOffset -= 5
            this.platforms.forEach(platform => {
                platform.position.x += 5
            })
            this.blackHole.position.x += 5
        } else if (this.keys.right.pressed){
            //makes this.platforms scroll
            this.scrollOffset += 5
            this.platforms.forEach(platform => {
                platform.position.x -= 5
            })
            this.blackHole.position.x -= 5
        }
    }

    const mid = (this.blackHole.width / 2) + this.blackHole.position.x
    if (this.player.position.x <= mid){
        // alert("blackhole got you!")
        this.reset()
    }


    // platform collision detecion
    this.platforms.forEach(platform => {
        if (this.player.position.x <= platform.position.x + (platform.width - 45) &&
            this.player.position.x + this.player.width >= platform.position.x &&
            this.player.position.y < platform.position.y + (platform.height - 10) &&
            this.player.position.y + this.player.height >= platform.position.y) {
             // collision detected!
             this.player.velocity.y = 0
             this.player.velocity.x = -0.1
        } else{
            this.player.velocity.x = 0
        }
    })
    //win condition
    if (this.scrollOffset === 3100){
        this.score = this.scrollOffset
        const winLabel = document.getElementById('win')
        winLabel.style.display = "block"
        winLabel.style.color = "white"
        cancelAnimationFrame(gameRun)
    }
    // game score
    if (this.scrollOffset >= 0){
        this.score = this.scrollOffset
        document.getElementById('output').innerHTML=this.score
    }else{
        this.score = 0
    }
}
}

export default Game
