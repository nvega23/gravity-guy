class Platform{
    constructor({x, y}, ctx){
        this.ctx = ctx
        this.plateformImage = new Image()
        this.plateformImage.src = '../src/images/background.png'

        this.position = {
            x,
            y
        }
        this.width = 3000
        this.height = 300
    }
    draw(){
        this.ctx.drawImage(this.plateformImage, this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.ctx.draw()
        this.ctx.update()
    }
}
export default Platform
