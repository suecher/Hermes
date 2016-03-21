/**
 * Created by Administrator on 2016/3/16.
 */

module.exports = {
    coefficient:0.05, //系数
    scoring:function(score,arrowCount){
        return score + (arrowCount * this.coefficient);
    }
}