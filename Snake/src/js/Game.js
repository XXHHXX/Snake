//游戏入口
var oGame = new Game();
oGame.timer = null;
oGame.delay = 500;
oGame.score = 0;

oGame.init = function () {
    oG.init();
    oSnake.init();
    creatFood(oG, oSnake)
    //绑定键盘事件
    document.onkeydown = function (e) {
        if (e.which === 37 && oSnake.direction !== DIRECTION.RIGHT) {
            oSnake.direction = DIRECTION.LEFT;
        }else if (e.which === 38 && oSnake.direction !== DIRECTION.DOWN) {
            oSnake.direction = DIRECTION.UP;
        }else if (e.which === 39 && oSnake.direction !== DIRECTION.LEFT) {
            oSnake.direction = DIRECTION.RIGHT;
        }else if(e.which === 40 && oSnake.direction !== DIRECTION.UP) {
            oSnake.direction = DIRECTION.DOWN;
        }
    }
};

oGame.start = function () {
    clearInterval(oGame.timer);
    oGame.timer = setInterval(() => {
        oSnake.move(oG);
    }, oGame.delay);
}
oGame.over = function () {
    clearInterval(oGame.timer);
}
oGame.init();

function creatFood(oG, oSnake) {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        var ok = true;
        for (var node = oSnake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
            console.log('-----------')
        }
        if (ok) {
            console.log(ok);
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'green');
    oG.remove(food.x, food.y);
    oG.append(food);
}