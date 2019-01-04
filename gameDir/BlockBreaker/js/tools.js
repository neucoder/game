var log = function () {
    console.log.apply(console, arguments)
}

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectOverlap = function (rect1, rect2) {
        rect1.x1 = rect1.x + rect1.width
        rect1.y1 = rect1.y + rect1.height
        rect2.x1 = rect2.x + rect2.width
        rect2.y1 = rect2.y + rect2.height

        if (rect2.x > rect1.x1 || rect2.x1 < rect1.x || rect2.y > rect1.y1 || rect2.y1 < rect1.y) {

            return false
        } else {
            return true
        }
}