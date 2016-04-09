/**
 * Created by SueCh on 2016/4/10.
 */

module.exports = function(app){
    app.route('/test2')
        .get(function(req,res){
            res.sendfile('index.html');
        });
};