//抽象工厂
function SquareFactory() {

}
//抽象工厂接口
SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] === 'undefined') {
        throw 'no this constructor';
    }
    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    // var arg = [].slice.call(arguments, 1);
    // var newSquare = SquareFactory.prototype[type](...arg);
    var newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare;
}


SquareFactory.prototype.init = function (square, color, ms) {
    var dom = square.viewContent;
    var domStyle = dom.style;
    domStyle.position = 'absolute';
    domStyle.backgroundColor = color;
    domStyle.width = square.width + 'px';
    domStyle.height = square.height + 'px';
    domStyle.left = square.x * square.width + 'px';
    domStyle.top = square.y * square.height + 'px';
    //重写这个方法
    square.touch = function () {
        return ms;
    }
}


//子类工厂
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, STRATEGY.MOVE);
    return floor;
}
SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, STRATEGY.DIE);
    return stone;
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var sb = new SnakeBoody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sb, color, STRATEGY.DIE);
    return sb;
}
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var sh = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sh, color, STRATEGY.DIE);
    sh.update(x, y);//覆盖并映射到标签上面
    return sh;
}
SquareFactory.prototype.Food = function (x, y, color) {
    var fd = new SnakeBoody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(fd, color, STRATEGY.EAT);
    fd.update(x, y);
    return fd;
}
