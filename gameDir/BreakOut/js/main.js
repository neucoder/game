var main = () => {
    log(`---start---:main`)
    var images = {
        ball: "images/ball.png",
        paddle: "images/paddle.png",
        block: "images/block.png",
    }
    var game = Game.instance(30, images)


}

main()