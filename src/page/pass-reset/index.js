/*
* @Author: Administrator
* @Date:   2017-09-13 09:45:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-13 11:46:35
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

var passReset={

	data:{
	username:'',
	question:'',
	answer:'',
	token:''
     },
     init:function(){
          this.bindEvent();
          this.onLoad();
     },
     onLoad:function(){
     	this.loadStepUsername();
     },
     //加载输入用户名
     loadStepUsername:function(){
          $(".step.username").show();
     },
     //加载输入问题
     loadStepQuestion:function(){
     	//清除错误提示
     	  formError.hide();
     	  //显示密码提示问题
          $(".step.username").hide();
           $(".step.answer").show().find("#tipQuestion").text(this.data.question);
     },
     //加载输入密码
     loadStepPassword:function(){
          formError.hide();
     	  //显示密码提示问题
          $(".step.answer").hide();
           $(".step.password").show();
     },
     bindEvent:function(){
     	var _this=this;
     	$("#submit-username").click(function(){
     	      var username=$.trim($("username").val());
     	      if (username) {
     	      	   user.getQuestion(username,function(res){
                        _this.data.username=username;
                        _this.data.question=res;
                        _this.loadStepQuestion();
     	      	   },function(msg){
                      formError.show(msg);
     	      	   })
     	      }else{
     	      	formError.show("请输入您的用户名");
     	      }
     	});
     	$("#submit-answer").click(function(){
     		  var answer=$.trim($("answer").val());
     	      if (answer) {
     	      	   user.checkAnswer({
     	      	   	username:this.data.username,
     	      	   	question:this.data.question,
     	      	   	answer:answer
     	      	   },function(res){
                        _this.data.answer=answer;
                        _this.data.token=res;
                        _this.loadStepPassword();
     	      	   },function(msg){
                      formError.show(msg);
     	      	   })
     	      }else{
     	      	formError.show("请输入您的答案");
     	      }
     	});
     	$("#submit-password").click(function(){
     		 var password=$.trim($("password").val());
     	      if (password && password.length<=6) {
     	      	   user.resetPassword({
     	      	   	username:this.data.username,
     	      	   	password:this.data.password,
     	      	   	forgetToken:this.data.token
     	      	   },function(res){
                       window.location.href='./result.html?type=pass-reset'
     	      	   },function(msg){
                      formError.show(msg);
     	      	   })
     	      }else{
     	      	formError.show("请输入不少于6位的密码");
     	      }
     	});

     	
     }
    
     
};
$(function(){
	passReset.init();
})