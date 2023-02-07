class Platform{
    constructor({x, y}, ctx){
        this.ctx = ctx
        this.plateformImage = new Image()
        this.plateformImage.src = '../images/background.png'
        this.plateformImage.onload = () => {
            // const img = await loadImage('../images/background.png')
            console.log(this.plateformImage)
            this.position = {
                x,
                y
            }
            this.width = 250
            this.height = 150
        }
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
