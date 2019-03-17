//需要的工具方法
var tool = {
    //圣杯模式 原型继承
    inherit: function (target, origin) {
        var temp = function () { };
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
        target.prototype.uber = origin;
    },
    //私有属性和原型的继承
    extends: function (origin) {
        var result = function () {
            origin.apply(this, arguments);
        }
        this.inherit(result, origin);
        return result;
    },
    //单例
    single: function (origin) {
        var singleResult = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object') {
                    return instance;
                }
                instance = this;
                origin && origin.apply(this, arguments);
                return instance;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
}