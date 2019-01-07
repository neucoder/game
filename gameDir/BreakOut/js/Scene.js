class Scene {
    constructor(game){
        //this.game = game
        var game = game
        //this.paddle = Paddle(game.imageByName('paddle'),10,10)
        this.ball = new Ball(game.imageByName('ball'),0,0,10,10)
        this.draw()

    }

    draw(){
        log('scene draw',this.ball,this.game)
        this.ball.move()
        game.draw(this.ball)
        //window.requestAnimationFrame(this.game.draw)
    }

    update(){

    }

    clear(){

    }

}