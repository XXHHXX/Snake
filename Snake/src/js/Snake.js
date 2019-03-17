//生成蛇和游戏处理策略
var oSnake = new Snake();
oSnake.head = null;
oSnake.tail = null;

oSnake.init = function () {
    var SnakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var SnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    var SnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');

    //双向链表 让蛇的每个方块之间有一定关系
    SnakeHead.next = SnakeBody1;
    SnakeHead.prev = null;
    SnakeBody1.next = SnakeBody2;
    SnakeBody1.prev = SnakeHead;
    SnakeBody2.next = null;
    SnakeBody2.prev = SnakeBody1;


    //渲染蛇
    oG.remove(SnakeHead.x, SnakeHead.y);
    oG.append(SnakeHead);

    oG.remove(SnakeBody1.x, SnakeBody1.y);
    oG.append(SnakeBody1);

    oG.remove(SnakeBody2.x, SnakeBody2.y);
    oG.append(SnakeBody2);
    //始终记录蛇头蛇尾;
    this.head = SnakeHead;
    this.tail = SnakeBody2;

    //给予默认方向
    this.direction = DIRECTION.RIGHT;
};


//策略
oSnake.strategy = {
    MOVE: function (snake, square, oG, flag) {
        //创建一个新的身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
        newBody.prev = null;
        newBody.next = snake.head.next;
        newBody.next.prev = newBody;
        oG.remove(snake.head.x, snake.head.y);
        oG.append(newBody);

        //创建蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        newHead.prev = null;
        newHead.next = newBody;
        newBody.prev = newHead;
        oG.remove(square.x, square.y);
        oG.append(newHead);
        //更新蛇头
        oSnake.head = newHead;
        
        //flag =  true  || undefined
        if (!flag) {
            var floor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            oG.remove(snake.tail.x, snake.tail.y);
            oG.append(floor);
            //更新蛇尾
            oSnake.tail = snake.tail.prev;
        }

    },
    DIE: function () {
        alert(oGame.score);
        oGame.over();
        oGame.init();
    },
    EAT: function (snake, square, oG) {
        this.MOVE(snake, square, oG, true);
        oGame.score++;
        creatFood(oG, oSnake);
    }
}

//根据方向预判下一个方块位置 并返回相应的提示信息 'MOVE' 'DIE'  'EAT'
oSnake.move = function (oG) {
    var square = oG.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(square.touch());
    if (typeof square.touch === 'function') {
        this.strategy[square.touch()](this, square, oG);
    }
};
