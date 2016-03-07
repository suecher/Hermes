/**
 * Created by SueCh on 2016/3/6.
 */
var log4js = require('log4js');

log4js.configure({
    appenders:[
        {type:'console'},//控制台输出
        {type:'file',
            filename:'logs/access.log',
            maxLogSize:1024,
            backups:3,
            category:'normal'}
    ],
    replaceConsole:true
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');


module.exports = logger;