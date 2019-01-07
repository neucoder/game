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
 g.content.clearRect(0, 0, canvas.width, canvas.height)
        //draw
        g.draw()
        g.update()
        //clear


    }, 1000 / 60)

    return g
}


var Ball = function () {
    var image = imageFromPath("images/ball.png")
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
    var image = imageFromPath("images/block.png")
    var o = {
        image: image,
        x: pos[0],
        y: pos[1],
        width: image.width,
        height: image.height
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
    var image = imageFromPath("images/paddle.png")
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

