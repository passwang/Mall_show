/*
* @Author: Administrator
* @Date:   2017-09-14 11:12:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-14 12:09:54
*/
require("./index.css");
require("../../page/common/header/index.js");
require("../../page/common/footer/index.js");
require("../../page/common/nav/index.js");
var navside=require("../../page/common/nav-side/index.js");
var mm=require("util/mm.js");
var user=require('service/user-service.js');

var  password={
	  init:function(){
	  	 this.onLoad();
	  	 this.bindEvent();
	  },
	  onLoad:function(){
	  	navside.init({
	     name:'pass-update'
         });
	  },
	  bindEvent:function(){
	  	var _this=this;
	  	$(document).on("click",".userUpdate",function(){
	  		var userInfo={
	  			password:$.trim($("#password").val()),
	  			passwordNew:$.trim($("#passwordNew").val()),
	  			passwordConfirm:$.trim($("#passwordConfirm").val())
	  		}
	  		var validateResult=_this.validateForm(userInfo);
	  		if (validateResult.status) {
	  			user.passwordUpdate({
	  				passwordOld:userInfo.password,
	  				passwordNew:userInfo.passwordNew
	  			},function(res,msg){
                     mm.successTips(msg);
	  			},function(err){
                     mm.errorTips(err);
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

        if (mm.validate(formData.password,'required')) {
        	  result.msg='密码不能为空';
        	  return result;
        };

        if (!formData.passwordNew || formData.passwordNew<6) {
        	  result.msg='密码不能少于6位';
        	  return result;
        };
       
         if (formData.passwordNew!=formData.passwordConfirm) {
            result.msg='两次输入的密码不一致';
            return result;
        };
        
           result.status=true;
           result.msg='验证通过';
           return result;

     }
	 
};
$(function(){
	password.init();
})
