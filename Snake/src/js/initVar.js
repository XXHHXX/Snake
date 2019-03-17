//初始化变量

//场景宽度系数 高度系数
var XLEN = 30;
var YLEN = 30;

// 每个方块 宽高
var SQUAREWIDTH = 20;

// 场景位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

// 定义基类
function Square(x, y, width, height, viewContent) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = viewContent || document.createElement('div');
}
Square.prototype.touch = function () {
    console.log('touch');
}
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

//定义子类
//地板    single-->单例
var Floor = tool.extends(Square);
//围墙
var Stone = tool.extends(Square);
//食物
var food = tool.single(Square);
//蛇头
var SnakeHead = tool.single(Square);
// 蛇身
var SnakeBoody = tool.extends(Square);
// 蛇
var Snake = tool.single();
// 场景
var Ground = tool.single(Square);
// 游戏
var Game = tool.single();

//方向枚举
var DIRECTION = {
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    },
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    }
};

var STRATEGY = {
    MOVE: 'MOVE',
    EAT: 'EAT',
    DIE: 'DIE'
};