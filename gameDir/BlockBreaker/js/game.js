var log = function () {
    console.log.apply(console, arguments)
}


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

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path


    //log(img)
    return img
}

var Ball = function () {
    var image = imageFromPath("images/ball.jpg")
    var o = {
        image: image,
        x: 150,
        y: 240,
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


    return o
}

var Paddle = function () {
    var image = imageFromPath("images/paddle.jpg")
    var o = {
        image: image,
        x: 150,
        y: 280,
        speed: 10,
    }

    o.moveLeft = function () {
        if (o.x > 0) {
            o.x -= o.speed
        }
    }
    o.moveRight = function () {
        if (o.x + o.image.width < 400) {
            o.x += o.speed
        }
    }
    //碰撞检测
    o.collide = function (ball) {
        o.x1 = o.x + o.image.width
        o.y1 = o.y + o.image.height
        ball.x1 = ball.x + ball.image.width
        ball.y1 = ball.y + ball.image.height

        if (ball.x > o.x1 || ball.x1 < o.x || ball.y > o.y1 || ball.y1 < o.y) {

            return false
        } else {
            log(ball.x > o.x1, ball.x1 < o.x, ball.y > o.y1, ball.y1 < o.y,ball.y1,o.y)

            log(`ball:(x:${ball.x},y:${ball.y})(x1:${ball.x1},y1:${ball.y1})paddle:(x:${o.x},y:${o.y})(x1:${o.x1},y1:${o.y1})`)
            //ball.stopFire()
            //debugger

            return true
        }
    }


    return o
}


var main = function () {
    var game = Game()
    var paddle = Paddle()
     ball = Ball()

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
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
    }
    game.draw = function () {
        //log('draw')
        game.drawImage(paddle)
        game.drawImage(ball)
    }
}

main()



