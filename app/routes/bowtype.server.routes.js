/**
 * Created by Administrator on 2016/4/20.
 */



var bowtype = require('../../config/bowType.json');

module.exports = function(app){
    app.route('/equip/bowtype')
        .get(function(req,res){
            console.log(bowtype);
            res.json(bowtype);
        });
};