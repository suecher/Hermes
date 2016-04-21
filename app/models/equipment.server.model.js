var mongoose = require('mongoose');

var equipmentSchema=new mongoose.Schema({
    equipmentname:String, //装备名
    userId:String,  //用户ID
    picture:String,   //装备图片
    equipmentType:String,  //装备类型
    BowBrand:String,     //弓把品牌
    BowPieceBrand:String,   //弓把品牌
    poundCount:Number   //磅数
});
var User = mongoose.model('equipment',equipmentSchema);