/**
 * Created by Administrator on 2016/3/11.
 */

var FriendController = require('../controllers/friend.server.controller');

module.exports = function(app){
    app.route('/addfriend')
        .post(function(req,res){

            FriendController.create(req.body,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/getfriends')
        .post(function(req,res){
            FriendController.getfriend(req.body.userId,function(resultobjs){
                res.json(resultobjs);
            });
        });

    app.route('/removefriend')
        .post(function(req,res){
            FriendController.removefriend(req.body.userId,req.body.friendId,function(resultobjs){
                res.json(resultobjs);
            });
        });
};