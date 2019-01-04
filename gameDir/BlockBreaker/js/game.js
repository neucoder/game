var Game = function () {
    var g = {
        actions: {},
        keydowns: {}
    }

    var canvas = document.querySelector("#id-canvas")
    var content = canvas.getContext("2d")

    g.canvas = canvas
    g.content = content
    //drawImage

    g.drawImage = function (img) {
        g.content.drawImage(img.image, img.x, img.y)
    }


    //event

    window.addEventListener("keydown", function (event) {
        g.keydowns[event.key] = true

    })

    window.addEventListener("keyup", function (event) {
        g.keydowns[event.key] = false

    })

    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }


    //timer
    setInterval(function () {
        //update
        //log('timer')
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }

        }
        //update

        g.update()
        //clear

        g.content.clearRect(0, 0, canvas.width, canvas.height)
        //draw
        g.draw()
    }, 1000 / 60)

    return g
}


var Ball = function () {
    var image = imageFromPath("images/ball.jpg")
    var o = {
        image: image,
        x: 150,
        y: 240,
        width: image.width,
        height: image.height,
        speedX: 3,
        speedY: 3,
        fired: false
    }
    o.fire = function () {
        o.fired = true
    }

    o.stopFire = function () {
        o.fired = false
    }

    o.move = function () {
        if (o.fired) {

            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y + o.image.height > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
            //log(o.x,o.y)
        }

    }

    //碰撞检测
    o.collide = function (paddle) {
        return rectOverlap(o, paddle)
    }

    return o
}

var block = function (pos) {
    //把block的位置pos数组传入
    var image = imageFromPath("images/block.jpg")
    var o = {
        image: image,
        x: pos[0],
        y: pos[1],
        width: image.width,
        height: image.height
    }
    o.collide = function (ball) {
        return rectOverlap(o,ball)
    }
    o.change = function (ball) {
        ball.speedY *= -1
    }
    return o
}

var blocks = function () {
    o = [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 0, 0],
    ]

    return o
}


var Paddle = function () {
    var image = imageFromPath("images/paddle.jpg")
    var o = {
        image: image,
        x: 150,
        y: 280,
        width: image.width,
        height: image.height,
        speed: 10,
    }
    o.move = function (x) {
        if (x < 0) {
            x = 0
        }
        if (x + o.image.width > 400) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(o.x - o.speed)
    }
    o.moveRight = function () {
        o.move(o.x + o.speed)
    }


    return o
}


var main = function () {

    var game = Game()
    var paddle = Paddle()
    ball = Ball()
    var Block = blocks()

    var drawBlocks = function () {
        //log('draw block start',Block.length,Block[0].length)
        for (var i = 0; i < Block.length; i++) {
            for (var j = 0; j < Block[i].length; j++) {
                tBlock = block([1 + j * 50, 1 + i * 20])
                if(Block[i][j]===1){
                    //log('block draw',Block)
                    game.drawImage(tBlock)
                }
                if(tBlock.collide(ball)){
                    if(Block[i][j]===1){
                        tBlock.change(ball)
                    }
                    Block[i][j] = 0
                    //if(Block[i][j] === )
                    //tBlock.change(ball)
                }
            }
        }
    }
    game.registerAction('a', function () {
        paddle.moveLeft()
    })

    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })
    game.registerAction('p', function () {
        ball.stopFire()
    })


    game.update = function () {
        ball.move()
        if (ball.collide(paddle)) {
            ball.speedY *= -1
        }
    }
    game.draw = function () {
        //log('draw')
        game.drawImage(paddle)
        game.drawImage(ball)
        drawBlocks()
    }
}

main()



