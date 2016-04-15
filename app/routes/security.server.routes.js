/**
 * Created by SueCh on 2016/4/14.
 */

module.exports = function(app){
    app.route('/')
        .post(function(req,res){
            let mobile = req.body.mobile;

        });


    app.route('/securitycode')
        .post(function(req,res){

        });
};