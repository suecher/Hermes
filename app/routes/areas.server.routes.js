/**
 * Created by Administrator on 2016/3/8.
 */

var areas = require('../../config/china.info.config');

module.exports = function(app){
    app.route('/areas/province')
        .get(function(req,res,next){
            res.json(areas.province);
        })

    app.route('/areas/city')
        .get(function(req,res,next){
            res.json(areas.city);
        })

    app.route('/areas/district')
        .get(function(req,res,next){
            res.json(areas.district);
        })
};