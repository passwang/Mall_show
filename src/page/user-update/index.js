/*
* @Author: Administrator
* @Date:   2017-09-13 13:53:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-14 11:17:41
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
	  	 this.bindEvent();
	  },
	  onLoad:function(){
	  	navside.init({
	    name:'user-center'
         });
	  	//加载用户信息
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
	  },
	  bindEvent:function(){
	  	var _this=this;
	  	$(document).on("click",'.userUpdate',function(){
                   var userInfo={
                   	phone:$.trim($("#userPhone").val()),
                   	email:$.trim($("#userEmail").val()),
                    question:$.trim($("#userQuestion").val()),
                   	answer:$.trim($("#userAnswer").val())
                   };
               var validateResult=_this.validateForm(userInfo);
               if (validateResult.status) {
               	     user.updateUserInfo(userInfo,function(res,msg){
                         mm.successTips(msg);
                         window.location.href="./user-center.html";
               	     },function(error){
                         mm.errorTips(error);
               	     })
               }else{
                   mm.errorTips(validateResult.msg);
               }

	  	})
	  },
	  validateForm:function(formData){
        var result={
        	status:false,
        	msg:''
        };

        if (mm.validate(formData.phone,'required')) {
        	  result.msg='手机不能为空';
        	  return result;
        };


        if (mm.validate(formData.question,'required')) {
        	  result.msg='问题不能为空';
        	  return result;
        };

        if (mm.validate(formData.answer,'required')) {
        	  result.msg='答案不能为空';
        	  return result;
        };
          if (!mm.validate(formData.phone,'phone')) {
              result.msg='手机格式错误';
               return result;
          };
          if (!mm.validate(formData.phone,'email')) {
              result.msg='邮箱格式错误';
               return result;
          };

           result.status=true;
           result.msg='验证通过';
           return result;

     }
   
};

$(function(){
	userCenter.init();
})
