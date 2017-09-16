/*
* @Author: Administrator
* @Date:   2017-09-06 12:24:14
* @Last Modified by:   Administrator
<<<<<<< HEAD
* @Last Modified time: 2017-09-14 15:17:41
*/
require("./index.css");
require("page/common/nav-simple/index.js");
require("page/common/footer/index.js");

var mm=require("util/mm.js");
var user=require('service/user-service.js');
//表单里的错误提示
var formError={
   show:function(errMsg){
    $(".error-item").show().find(".error-msg").text(errMsg)
   },
   hide:function(){
       $(".error-item").hide().find(".error-msg").text('')
   }
};

var login={
     init:function(){
          this.bindEvent();
     },
     bindEvent:function(){
     	var _this=this;
     	$("#login-button").click(function(){
     		_this.submit();
     	});
     	$('.user-content').keyup(function(e){
              if (e.keyCode===13) {
              		_this.submit();
              }
     	})
     },
     validateForm:function(formData){
        var result={
        	status:false,
        	msg:''
        };

        if (mm.validate(formData.username,'required')) {
        	  result.msg='用户名不能为空';
        	  return result;
        };

        if (mm.validate(formData.password,'required')) {
        	  result.msg='密码不能为空';
        	  return result;
        };
           result.status=true;
           result.msg='验证通过';
           return result;

     },
     submit:function(){
          var formData={
          	username:$.trim($("#username").val()),
          	password:$.trim($("#password").val())
          };
          //表单验证结果
          validateResult=this.validateForm(formData);
          if (validateResult.status) {
            
          	   user.Login(formData,function(res){
          	   	   window.location.href=mm.getUrlParam('redirct')||'./index.html';
          	   },function(error){
                    formError.show(error);
          	   })
             
          }else{
                    formError.show(validateResult.msg);
          }
     }
     
};
$(function(){
	login.init();
})
