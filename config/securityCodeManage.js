/**
 * Created by SueCh on 2016/4/15.
 */
"use strict";

let moment = require('moment');

module.exports = {

    createUserCode:function(mobile){
        if(mobile in this.securityList){
            delete this.securityList[mobile];
            this.securityList[mobile] = {time:Date.now(),code:this.createSecurityCode()}
        } else {
            this.securityList[mobile] = {time:Date.now(),code:this.createSecurityCode()}
        }
    },
    createSecurityCode:function(){
        let code = "";

        for(let i=0;i<6;i++){
            code += Math.floor(Math.random()*10);
        }

        return code;
    },
    verificationCode:function(mobile,code){
        if(mobile in this.securityList){
            let userCode = this.securityList[mobile];
            if(userCode.code == code){
                delete this.securityList[mobile];
                return {result:true};
            } else {
                return {result:false,errorMessage:"Code Error"};
            }
        } else {
            return {result:false,errorMessage:"User NotExist"};
        }
    },
    timer:function(){

        let securityList = this.securityList;
        setInterval(function(){
            for(let item in securityList){
                //如果现在时间大于存储时间加上15分钟，证明过期
                if(Date.now() > (new Date(securityList[item].time).getTime() + 1000 * 60 * 20)) {  //存储10分钟
                    delete securityList[item];
                }

                //console.log(new Date(this.securityList[item].time).getTime());
                //console.log(new Date(this.securityList[item].time).getTime() + 1000 * 60 * 15);
            }
        },1000 * 60 * 30); //20分钟清除一次
    },
    securityList:{}
};




//t.createUserCode('18674881900');
//t.createUserCode('18674881901');
//t.createUserCode('18674881902');
//t.timer();
//console.log(t.securityList);



//console.log(t.securityList);

//console.log(t.verificationCode('18674881900','182372'));
//console.log(moment(new Date().getTime()).format());
//console.log(moment(new Date().getTime() + 1000 * 60 * 30).format());


