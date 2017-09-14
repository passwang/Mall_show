/*
* @Author: Administrator
* @Date:   2017-09-13 13:52:18
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-14 09:16:22
*/
require("./index.css");
require("../../page/common/header/index.js");
require("../../page/common/footer/index.js");
require("../../page/common/nav/index.js");
var navside=require("../../page/common/nav-side/index.js");
var mm=require("util/mm.js");
var user=require('service/user-service.js');
var templateIndex=require("./index.string");
var  userCenter={
	  init:function(){
	  	 this.onLoad();
	  },
	  onLoad:function(){
	  	navside.init({
	    name:'user-center'
         });
	  	this.loadUserInfo();
	  },
	  //加载用户信息
	  loadUserInfo:function(){
	  	var  htmlText='';
	  	user.getUserInfo(function(res){
            htmlText=mm.renderHtml(templateIndex,res);
            $(".userInfo").html(htmlText);
	  	},function(error){
	  		mm.errorTips(error);
	  	})
	  }
};
$(function(){
	userCenter.init();
})
