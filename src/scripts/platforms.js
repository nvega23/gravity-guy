class Platform{
    constructor({x, y}, ctx){
        this.ctx = ctx
        this.plateformImage = new Image()
        this.position = {
            x,
            y
        }
        this.width = 250
        this.height = 150
        this.plateformImage.src = 'https://raw.githubusercontent.com/nvega23/gravity-guy/main/images/Pads/Pad_4_4.png'
    }
    draw(){
        this.ctx.drawImage(this.plateformImage, this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.ctx.draw()
        this.ctx.update()
    }
}

export default Platform;
