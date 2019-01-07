

var main = function () {

    var game = Game()
    var paddle = Paddle()
    var ball = Ball()
    var Block = blocks()

    var drawBlocks = function () {
        //log('draw block start',Block.length,Block[0].length)
        var levalFlag = true
        for (var i = 0; i < Block.length; i++) {
            for (var j = 0; j < Block[i].length; j++) {
                //var levalFlag = true
                tBlock = block([1 + j * 50, 1 + i * 20])
                if (Block[i][j] > 0) {
                    //log('block draw',Block)
                    game.drawImage(tBlock)
                }
                if (ball.collide(tBlock)) {
                    if (Block[i][j] > 0) {
                        tBlock.change(ball)
                    }
                    Block[i][j] -= 1
                    //if(Block[i][j] === )
                    //tBlock.change(ball)
                }
                //log("Block i j",Block[i][j] > 0)
                if (Block[i][j] > 0) {
                    levalFlag = false
                }
                //log(Block)
            }
        }
        //log("leval flag",levalFlag)
        if (levalFlag) {
            //log("you win")
            levalFlag = !levalFlag
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
        // log('ball paddle',ball.collide(paddle))
        //log("paddle",paddle, "ball",ball)
        if (ball.collide(paddle)) {
            //log('ball and paddle')
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



