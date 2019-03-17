//创建方块对象并渲染到页面
var oG = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

oG.init = function () {
    //渲染广场
    var dom = this.viewContent;
    var domStyle = dom.style;

    domStyle.position = 'absolute';
    domStyle.left = this.x + 'px';
    domStyle.top = this.y + 'px';
    domStyle.width = this.width + 'px';
    domStyle.height = this.height+ 'px';
    domStyle.backgroundColor = '#0ff';
    document.body.appendChild(dom);

    //储存管理广场中所有方块对象
    this.SquareTable = [];

    for (var i = 0; i < YLEN; i++) {
        this.SquareTable[i] = new Array(XLEN);
        for (var j = 0; j < XLEN; j++) {
            var newSquare = null;
            if (i == 0 || j == 0 || i == YLEN - 1 || j == XLEN -1) {
                //创建围墙
                newSquare = SquareFactory.create('Stone', j, i, 'black');
            }else {
                //创建地板
                newSquare = SquareFactory.create('Floor', j, i, 'orange');
            }
            this.SquareTable[i][j] = newSquare;
            // 将方块对象插入到页面
            this.viewContent.appendChild( newSquare.viewContent );
        }
    }
}
// 去掉方块
oG.remove = function (x, y) {
    var square = this.SquareTable[y][x];
    square.viewContent.remove();
    this.SquareTable[y][x] = null;
}
//添加方块
oG.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
}
oG.init();