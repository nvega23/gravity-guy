let playerState = 'run'
const dropDown = document.getElementById("animations")
dropDown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.width = 600

const playerImage = new Image();
playerImage.src = './src/images/shadow_dog.png'

const spriteWidth = 575
const spriteHeight = 523

let gameSpeed = 5
const backgroundlayer1 = new Image();//same as getElementByImage()
backgroundlayer1.src = '../src/images/sun.png'
const backgroundlayer2 = new Image();
backgroundlayer2.src = '../src/images/2.png'
const backgroundlayer3 = new Image();
backgroundlayer3.src = '../src/images/3.png'
const backgroundlayer4 = new Image();
backgroundlayer4.src = '../src/images/4.png'

const plateformImage = new Image()
plateformImage.src = '../src/images/background.png'

//changes sprite frame
let gameframe = 0;
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
    },
    {
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
        let positionX = j * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames;
})
console.log(spriteAnimations)

const gravity = 1.9

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 350
        }
        //player size
        this.width = 30
        this.height = 30
        //gravity
        //later we can implement code where if
        //in a space level, we turn the gravity off
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    draw() {
        // c.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH)
        // let position = Math.floor(gameframe / staggerFrames) % spriteAnimations[playerState].loc.length
        // let frameX = spriteWidth * position
        // let frameY = spriteAnimations[playerState].loc[position].y
        // c.drawImage(backgroundlayer1, 0, 0)
        // c.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
        // gameframe ++;
        c.fillStyle = "aqua"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }
        // this.velocity.y += gravity
    }
}

class Platform{
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 2800
        this.height = 150
    }
    draw(){
        c.fillStyle = "white"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


const player = new Player()
// const platform = new Platform()
const platforms = [
    // new Platform({
    // x: 250, y: 25}),
new Platform({
    x: 0, y: 500
}), new Platform({
    x: 258, y: 500
}), new Platform({
    x: 1030, y: 500
}), new Platform({
    x: 700, y: 525
})
]

const keys = {
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

let scrollOffset = 0

// let x = 0;
// let x2 = 550;
// c.drawImage(backgroundlayer1, x, 0)
// c.drawImage(backgroundlayer1, x2, 0)
// //checks if the image is out of canvas
// if (x < -600) x = 600 + x2 - gameSpeed;
// else x -= gameSpeed;
// if (x2 < -600) x2 = 600 + x - gameSpeed;
// else x2 -= gameSpeed;

class layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 600;
        this.height = 500;
        this.x2 = this.width;
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
        c.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

const layer1 = new layer(backgroundlayer3, 1)

function animate() {
    c.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH)
    layer1.update();
    layer1.draw();
    let position = Math.floor(gameframe / staggerFrames) % spriteAnimations[playerState].loc.length
    let frameX = spriteWidth * position
    let frameY = spriteAnimations[playerState].loc[position].y
    c.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    gameframe ++;
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    requestAnimationFrame(animate)

    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }else if (keys.space.pressed && player.position.x > 100){
        player.velocity.y += 10
    }else{
        player.velocity.x = 0
        if (keys.right.pressed){
            //makes platforms scroll
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        } else if (keys.right.pressed){
            //makes platforms scroll
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        }
        console.log(scrollOffset)
    }



    // platform collision detecion
    platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y
        >= platform.position.y && player.position.x + player.width
        >= platform.position.x && player.position.x <= platform.position.x
        + platform.width){
            player.velocity.y = 0
        }
    })
    if (scrollOffset > 2190){
        console.log("you Win")
    }
}
animate()

//keyCode is the number that you get when you press a key in the console
window.addEventListener("keydown", ({keyCode}) => {
    console.log(keyCode)
    switch(keyCode) {
        case 68:
            console.log("right")
            player.velocity.x = 1
            keys.right.pressed = true
            break
        case 65:
            console.log("left")
            keys.left.pressed = true
            player.velocity.x = -1
            break
        case 87:
            console.log("up")
            player.velocity.y -= 20
            break
        case 83:
            console.log("down")
            player.velocity.y += 20
            break
        case 32:
            console.log("space")
            keys.space.pressed = true
            player.velocity.x += 10
            break
    }
    console.log(keys.right.pressed)
})
window.addEventListener("keyup", ({keyCode}) => {
    // console.log(keyCode)
    switch(keyCode) {
        case 68:
            console.log("right")
            keys.right.pressed = false
            player.velocity.x = 0
            break
        case 65:
            console.log("left")
            keys.left.pressed = false
            player.velocity.x = 0
            break
        case 87:
            console.log("up")
            player.velocity.y -= 20
            break
        case 83:
            console.log("down")
            player.velocity.y += 20
            break
        case 32:
            console.log("space")
            keys.space.pressed = false
            player.gravity = 0
            break
    }
    console.log(keys.right.pressed)
})
