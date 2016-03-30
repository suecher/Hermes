/**
 * Created by SueCh on 2016/3/29.
 */

var level = require('../../config/level.config');

module.exports = function(app){
    app.route('/level')
        .get(function(req,res){
            res.json(level);
        });
};