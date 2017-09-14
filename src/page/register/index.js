/*
* @Author: Administrator
* @Date:   2017-09-12 12:43:43
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-12 15:20:01
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

var register={
     init:function(){
          this.bindEvent();
     },
     bindEvent:function(){
     	var _this=this;
      //验证用户名是否存在
      $("#username").blur(function(){
        var username=$.trim($(this).val());
        if (!username) {
            return;
        }
        user.checkUser(username,function(res){
            formError.hide(error);
        },function(error){
            formError.show(error);
        })
      });
     	$("#register-button").click(function(){
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
        if (formData.password.length<6) {
           result.msg='密码的长度不能小于6';
            return result;
        }
         if (formData.password!=formData.passwordConfirm) {
            result.msg='两次输入的密码不一致';
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
           if (mm.validate(formData.question,'required')) {
            result.msg='问题不能为空';
            return result;
        };
         if (mm.validate(formData.answer,'required')) {
            result.msg='答案不能为空';
            return result;
        };
          
           result.status=true;
           result.msg='验证通过';
           return result;

     },
     submit:function(){
          var formData={
          	username       :$.trim($("#username").val()),
            password       :$.trim($("#password").val()),
            passwordConfirm:$.trim($("#passwordConfirm").val()),
            phone          :$.trim($("#phone").val()),
            email          :$.trim($("#email").val()),
             question       :$.trim($("#question").val()),
             answer        :$.trim($("#answer").val())

          };
          //表单验证结果
          validateResult=this.validateForm(formData);
          if (validateResult.status) {
          	   user.Register(formData,function(res){
          	   	   window.location.href='./result.html?type=register';
          	   },function(error){
                    formError.show(error);
          	   })
             
          }else{
                    formError.show(validateResult.msg);
          }
     }
     
};
$(function(){
	register.init();
})