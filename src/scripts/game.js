import Player from './player'
import Platform from './platforms'
import Layer from './layers'
import blackHole from './blackHole.js'

class Game {
    constructor(ctx, CANVAS_WIDTH, CANVAS_HEIGHT) {
        this.CANVAS_WIDTH = CANVAS_WIDTH;
        this.CANVAS_HEIGHT = CANVAS_HEIGHT;
        this.scrollOffset = 0;
        this.ctx = ctx;
        this.player = new Player(this, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.blackHole = new blackHole(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.score = 0;
        this.gameSpeed = 5;
        this.backgroundlayer1 = new Image();
        this.backgroundlayer1.src = './images/nature.jpg';
        this.backgroundlayer2 = new Image();
        this.backgroundlayer2.src = './images/nature.jpg';
        this.backgroundlayer3 = new Image();
        this.backgroundlayer3.src = './images/nature.jpg';
        this.backgroundlayer4 = new Image();
        this.backgroundlayer4.src = './images/nature.jpg';
        this.moonImage = new Image();
        this.moonImage.src = '../images/sun.png';
        this.layer1 = new Layer(this.backgroundlayer1, 0.5, this.gameSpeed, this.ctx);
        this.layer2 = new Layer(this.backgroundlayer2, 0.5, this.gameSpeed, this.ctx);
        this.layer3 = new Layer(this.backgroundlayer3, 0.5, this.gameSpeed, this.ctx);
        this.layer4 = new Layer(this.backgroundlayer4, 0.5, this.gameSpeed, this.ctx);
        this.platforms = [
            new Platform({ x: 0, y: 500 }, this.ctx),
            new Platform({ x: 0, y: -31 }, this.ctx),
            new Platform({ x: 200, y: 500 }, this.ctx),
            new Platform({ x: 500, y: 350 }, this.ctx),
            new Platform({ x: 800, y: -31 }, this.ctx),
            new Platform({ x: 1000, y: -31 }, this.ctx),
            new Platform({ x: 1500, y: -31 }, this.ctx),
            new Platform({ x: 1500, y: 500 }, this.ctx),
            new Platform({ x: 1300, y: 500 }, this.ctx),
            new Platform({ x: 1800, y: 350 }, this.ctx),
            new Platform({ x: 2150, y: 500 }, this.ctx),
            new Platform({ x: 2150, y: -31 }, this.ctx),
            new Platform({ x: 2400, y: -31 }, this.ctx),
            new Platform({ x: 2500, y: 350 }, this.ctx),
            new Platform({ x: 2500, y: -31 }, this.ctx),
            new Platform({ x: 2600, y: -31 }, this.ctx),
            new Platform({ x: 2800, y: 500 }, this.ctx),
            new Platform({ x: 3000, y: 500 }, this.ctx),
            new Platform({ x: 2500, y: -31 }, this.ctx),
            new Platform({ x: 2500, y: 500 }, this.ctx),
            new Platform({ x: 2300, y: 500 }, this.ctx),
            new Platform({ x: 2500, y: 350 }, this.ctx)
        ];
        this.keys = {
            right: { pressed: false },
            left: { pressed: false },
            space: { pressed: false }
        };
        this.animate = this.animate.bind(this);
        this.animate();
        this.bindKeys();
    }

    bindKeys() {
        window.addEventListener("keydown", ({ keyCode }) => {
            switch (keyCode) {
                case 68:
                    this.keys.right.pressed = true;
                    break;
                case 65:
                    this.keys.left.pressed = true;
                    break;
                case 87:
                    this.player.velocity.y -= 20;
                    break;
                case 83:
                    this.player.velocity.y += 20;
                    break;
                case 32:
                    this.keys.space.pressed = true;
                    break;
            }
        });
        window.addEventListener("keyup", ({ keyCode }) => {
            switch (keyCode) {
                case 68:
                    this.keys.right.pressed = false;
                    break;
                case 65:
                    this.keys.left.pressed = false;
                    break;
                case 87:
                    this.player.velocity.y -= 20;
                    break;
                case 83:
                    this.player.velocity.y += 20;
                    break;
                case 32:
                    this.keys.space.pressed = false;
                    break;
            }
        });
    }

    reset() {
        [this.player.position.x, this.player.position.y] = [100, 320];
        this.platforms = [
            new Platform({ x: 0, y: 500 }, this.ctx),
            new Platform({ x: 0, y: -31 }, this.ctx),
            new Platform({ x: 200, y: 500 }, this.ctx),
            new Platform({ x: 500, y: 350 }, this.ctx),
            new Platform({ x: 800, y: -31 }, this.ctx),
            new Platform({ x: 1000, y: -31 }, this.ctx),
            new Platform({ x: 1500, y: -31 }, this.ctx),
            new Platform({ x: 1500, y: 500 }, this.ctx),
            new Platform({ x: 1300, y: 500 }, this.ctx),
            new Platform({ x: 1800, y: 350 }, this.ctx),
            new Platform({ x: 2150, y: 500 }, this.ctx),
            new Platform({ x: 2150, y: -31 }, this.ctx),
            new Platform({ x: 2400, y: -31 }, this.ctx),
            new Platform({ x: 2500, y: 350 }, this.ctx),
            new Platform({ x: 2500, y: -31 }, this.ctx),
            new Platform({ x: 2600, y: -31 }, this.ctx),
            new Platform({ x: 2800, y: 500 }, this.ctx),
            new Platform({ x: 3000, y: 500 }, this.ctx),
            new Platform({ x: 2500, y: -31 }, this.ctx),
            new Platform({ x: 2500, y: 500 }, this.ctx),
            new Platform({ x: 2300, y: 500 }, this.ctx),
            new Platform({ x: 2500, y: 350 }, this.ctx)
        ];
        this.blackHole.position.x = -500;
        this.scrollOffset = 0;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        // Update and draw layers
        this.layer1.update();
        this.layer1.draw();
        this.layer2.update();
        this.layer2.draw();
        this.layer3.update();
        this.layer3.draw();
        this.layer4.update();
        this.layer4.draw();

        // Draw platforms
        this.platforms.forEach(platform => {
            platform.draw();
        });

        if (this.player.position.y >= 600) {
            this.reset();
        }

        this.blackHole.update();
        this.player.update();

        const gameRun = requestAnimationFrame(this.animate);

        // Handle player movement and platform scrolling
        if (this.keys.right.pressed && this.player.position.x < 100) {
            this.player.velocity.x = 5;
        } else if (this.keys.left.pressed && this.player.position.x > 100) {
            this.player.velocity.x = -5;
        } else {
            this.player.velocity.x = 0;
            if (this.keys.right.pressed) {
                this.scrollOffset += 5;
                this.platforms.forEach(platform => {
                    platform.position.x -= 5;
                });
                this.blackHole.position.x -= 5;
            } else if (this.keys.left.pressed) {
                this.scrollOffset -= 5;
                this.platforms.forEach(platform => {
                    platform.position.x += 5;
                });
                this.blackHole.position.x += 5;
            }
        }

        const mid = (this.blackHole.width / 2) + this.blackHole.position.x;
        if (this.player.position.x <= mid) {
            this.reset();
        }

        this.platforms.forEach(platform => {
            const playerLeft = this.player.position.x;
            const playerRight = this.player.position.x + this.player.width;
            const playerTop = this.player.position.y;
            const playerBottom = this.player.position.y + this.player.height;

            const platformLeft = platform.position.x;
            const platformRight = platform.position.x + platform.width;
            const platformTop = platform.position.y;
            const platformBottom = platform.position.y + platform.height;

            const isHorizontalCollision = playerRight >= platformLeft && playerLeft <= platformRight;
            const isVerticalCollision = playerBottom >= platformTop && playerTop <= platformBottom;

            if (isHorizontalCollision && isVerticalCollision) {
                // Collision detected
                if (this.player.velocity.y > 0 && playerTop < platformBottom) {
                    // Vertical collision from above, stick to the bottom of the platform
                    this.player.velocity.y = 0;
                    this.player.position.y = platformTop - this.player.height;
                } else if (this.player.velocity.y < 0 && playerBottom > platformTop) {
                    // Vertical collision from below, prevent player from passing through
                    this.player.velocity.y = 0;
                    this.player.position.y = platformBottom;
                }

                if (this.player.velocity.x > 0 && playerLeft < platformRight) {
                    // Horizontal collision from the left, prevent player from passing through
                    this.player.velocity.x = 0;
                    this.player.position.x = platformLeft - this.player.width;
                } else if (this.player.velocity.x < 0 && playerRight > platformLeft) {
                    // Horizontal collision from the right, prevent player from passing through
                    this.player.velocity.x = 0;
                    this.player.position.x = platformRight;
                }
            }
        });

        // Win condition
        if (this.scrollOffset >= 3100) {
            this.score = this.scrollOffset;
            const winLabel = document.getElementById('win');
            winLabel.style.display = "block";
            winLabel.style.color = "white";
            cancelAnimationFrame(gameRun);
        } else {
            // Update score
            if (this.scrollOffset >= 0) {
                this.score = this.scrollOffset;
                document.getElementById('output').innerHTML = this.score;
            } else {
                this.score = 0;
            }
        }
    }
}

export default Game;
