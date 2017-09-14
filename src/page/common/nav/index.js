/*
* @Author: Administrator
* @Date:   2017-09-10 06:32:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-13 09:03:19
*/
require("./index.css");
var mm=require("util/mm.js");
var user=require("service/user-service.js");
//通用页面头部
var nav={
	init:function(){
		this.bindEvent();
        this.loadUserInfo();
	},
	bindEvent:function(){
		//登录
      $(".js-login").on("click",function(){
      	mm.doLogin();
      });
      //注册
      $(".js-sign").on("click",function(){
      	window.location.href="./register.html"
      });
      //退出
      $(".out").on("click",function(){
      	user.logout(function(res){
      		window.location.reload();
      	},function(error){
      		mm.errorTips(error);
      	})
      });
	},
	loadUserInfo:function(){
		user.checkLogin(function(res){
         $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
		},function(error){

		})
	}
}
nav.init();