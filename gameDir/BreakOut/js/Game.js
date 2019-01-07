class Game {


    constructor(fps, images) {

        this.canvas = document.querySelector("#id-canvas")
        this.ctx = this.canvas.getContext("2d")
        window.fps = fps
        this.images = {}
        this.state = null
        this.length = Object.keys(images).length
        this.init(images)
        this.scene = {
            begin: this.begin,
            continue: this.continue,
            end: this.end,
        }
        this.ball = null
        this.paddle = null
        this.block = null
        this.blocks = null
        this.level = [
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],

        ]

    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }


    //初始化加载图片
    init(images) {
        log('init')
        var imgArr = []
        var keys = Object.keys(images)
        for (var i = 0; i < keys.length; i++) {
            let img = new Image()
            let name = keys[i]
            img.src = images[name]
            log(keys[i], images[name])

            img.onload = (keys) => {
                //log('on load', name, img)
                this.images[name] = img
                imgArr.push(1)
                //log(this.length, 'this. length', this.images, 'imgarr', imgArr.length)
                if (imgArr.length === this.length) {
                    log("if start")
                    this.start()
                    //this.runLoop()
                }
                log(this.images)
            }

        }

    }

    imageByName(name) {
        var img = this.images[name]
        return img
    }

    runScene(scene) {
        this.scene = scene
        this.runLoop()
    }

    start() {
        this.state = "begin"
        this.ball = new Ball(this.imageByName('ball'), 150, 150, 3, 3)
        this.paddle = new Paddle(this.imageByName('paddle'), 120, 280, 5, this.canvas)
        this.block = new Block(this.imageByName('block'), -100, -100)
        window.addEventListener('keydown', (e) => {


            if (e.key === 'a') {
                this.paddle.leftdown = true
            }
            if (e.key === 'd') {
                this.paddle.rightdown = true
            }

            if (e.key === 'c') {
                this.state = "continue"
            }
            if (e.key === 'r') {
                this.state = "begin"
                log(e.key, 'press down', this.state)
            }
        })
        window.addEventListener('keyup', (e) => {
            if (e.key === 'a') {
                this.paddle.leftdown = false
            }
            if (e.key === 'd') {
                this.paddle.rightdown = false
            }
        })

        window.requestAnimationFrame(() => this.loop())
        //this.runLoop()
    }

    drawBlock() {
        var h = this.level.length
        var l = this.level[0].length
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < l; j++) {
                if (this.level[i][j] > 0) {
                    this.block.x =  (2 + j * 34)
                    //log(this.block,(2 + j * 32))
                    this.block.y = i * 18
                    //log('block type',typeof block,block)
                    this.drawImage(this.block)
                    if(this.ball.collide(this.block)){
                        this.ball.dy *= -1
                        this.level[i][j] -= 1
                    }
                }else {
                    this.level[i][j] = 0
                }

            }
        }
    }


    draw() {
        // log('game,draw,this', this)
        if (this.state === "begin") {
            this.begin()
        }

        if (this.state === "continue") {
            this.drawImage(this.ball)
            this.drawImage(this.paddle)
            this.drawBlock()
        }
        if (this.state === "end") {
            this.end()
        }
        //window.requestAnimationFrame(this.draw)
    }

    drawImage(img) {
        this.ctx.drawImage(img.image, img.x, img.y)
    }

    begin() {
        this.ctx.font = "20px Georgia";
        this.ctx.fillText("game begin! press c to continue", 50, 50);
    }

    continue() {
        if (this.paddle.leftdown) {
            this.paddle.moveLeft()
        }
        if (this.paddle.rightdown) {
            this.paddle.moveRight()
        }
        if (this.ball.collide(this.paddle)) {
            this.ball.dy *= -1
        }

        if (this.ball.kill(this.paddle)) {
            this.ball.init(150, 150, this.ball.life)
        }
        //log(this.ball.die())
        if (this.ball.die()) {
            //log('die')
            this.ball.hide()
            this.paddle.hide()
        }
        this.ball.move()
    }

    end() {
        this.ctx.font = "20px Georgia"
        this.ctx.fillText("you are die!  press r key to start", 50, 50)
    }


    update() {
        if (this.state === "begin") {
            this.ball.init(150, 150, 5)
            this.paddle.init(120, 280)
        }
        if (this.state === "continue") {
            this.continue()
        }
        //this.scene[this.state]()
        if (this.ball.die()) {
            this.state = "end"
        }
    }

    loop() {
        //log('in loop see the this', this)
        this.update()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw()
        window.requestAnimationFrame(() => this.loop())
    }

    // runLoop() {
    //     this.update()
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    //     this.draw()
    //     setTimeout(() => {
    //         this.runLoop()
    //     }, 1000 / window.fps)
    // }
}


class Elem {
    constructor(image, x, y) {
        this.image = image
        this.x = x
        this.y = y
        log('elem,image', image)
        this.width = image.width
        this.height = image.height
        this.leftdown = false
        this.rightdown = false

    }

    hide() {
        this.x = -100
        this.y = -100
    }


}

class Block extends Elem {
    constructor(image, x, y) {
        super(image, x, y)
    }
}

class Paddle extends Elem {
    constructor(image, x, y, speed, ctx) {
        super(image, x, y)
        this.speed = speed
        this.ctx = ctx
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed
        }
    }

    moveRight() {
        //log("r", this.x, this.ctx)
        if (this.x + this.width < this.ctx.width) {
            this.x += this.speed
        }

    }

    init(x, y) {
        this.x = x
        this.y = y
    }

}

class Ball extends Elem {
    constructor(image, x, y, dx, dy) {
        super(image, x, y)
        this.dx = dx
        this.dy = dy
        this.life = 5
    }

    move() {
        if (this.x < 0 || this.x + this.width > 400) {
            this.dx *= -1
        }
        if (this.y < 0 || this.y + this.width > 300) {
            this.dy *= -1
        }
        this.x += this.dx
        this.y += this.dy
    }

    collide(paddle) {
        return rectOverlap(this, paddle)
    }

    kill(paddle) {
        //log(this.life)
        if (this.y > paddle.y) {
            this.life -= 1
            //log('kill if',this.life)
            return true
        }
        //log('else',this.y,paddle.y)

        return false

    }

    die() {

        return (this.life < 1)
    }

    init(x, y, life) {
        this.x = x
        this.y = y
        this.life = life
    }
}
