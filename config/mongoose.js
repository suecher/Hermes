/**
 * Created by Administrator on 2016/3/2.
 */
var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
    var db = mongoose.connect(config.mongodb);
    require('../app/models/user.server.model');
    require('../app/models/archeriesscore.server.model');
    require('../app/models/club.server.model');
    require('../app/models/friend.server.model');
    require('../app/models/honorbyuser.server.model.js');
    require('../app/models/message.server.model.js');
    require('../app/models/clubfollow.server.model.js');
    return db;
};