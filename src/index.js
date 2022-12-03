// import new_platform from ".images/new_platform.png"
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
console.log(c)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Sprite {
    constructor({position}){
        this.position = position
        this.image = new Image()
        this.image.src = "./images/new_platform.png"
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}



const gravity = 1.9
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
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
        c.fillStyle = "green"
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
        this.width = 2580
        this.height = 20
    }
    draw(){
        c.fillStyle = "white"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
// const platform = new Platform()
const platforms = [new Platform({
    x: 250, y: 106
}), new Platform({
    x: 0, y: 380
}), new Platform({
    x: 500, y: 380
})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    } else{
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
        }
        console.log(scrollOffset)
    }



    // platform collision detecion
    platforms.forEach(platform => {
    if (player.position.y + player.height < platform.position.y &&
        player.position.y + player.height + player.velocity.y
        >= platform.position.y && player.position.x + player.width
        >= platform.position.x && player.position.x <= platform.position.x
        + platform.width){
            player.velocity.y = 0
        }
    })
    if (scrollOffset > 2000){
        console.log("you Win")
    }
}

animate()
//keyCode is the number that you get when you press a key in the console
window.addEventListener("keydown", ({keyCode}) => {
    // console.log(keyCode)
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
    }
    console.log(keys.right.pressed)
})
