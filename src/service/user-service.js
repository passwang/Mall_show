/*
* @Author: Administrator
* @Date:   2017-09-12 11:48:59
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-14 11:59:43
*/
var mm=require('util/mm.js');
var user={
	//登录
	Login:function(userInfo,resolve,reject){
		mm.request({
	     url:mm.getServerUrl('/user/get_user_info_.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
		})
	},
	//检查用户名是否存在
	checkUser:function(username,resolve,reject){
		mm.request({
	     url:mm.getServerUrl('/user/check_valid.do'),
	     data:{
	     	type:'username',
	     	str:username
	     },
	     method:'POST',
	     success:resolve,
	     error:reject
		})
	},
	//注册
	Register:function(userInfo,resolve,reject){
		mm.request({
	     url:mm.getServerUrl('/user/register.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
		})
	},
	//退出登录
	logout:function(resolve,reject){
       mm.request({
        url:mm.getServerUrl('/user/logout.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//检查用户是否登录
	checkLogin:function(userInfo,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/get_user_info_.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//获取密码提示问题
	getQuestion:function(username,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/forget_get_question.do'),
	     data:{
	     	username:username
	     },
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//检查答案是否正确
    checkAnswer:function(userInfo,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/forget_check_answer.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//重置密码,没有登录
	 resetPassword:function(userInfo,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/forget_reset_password.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//加载用户信息
	getUserInfo:function(userInfo,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/load_user_message.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//更新用户信息
   updateUserInfo:function(userInfo,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/update_information.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
	//登录状态更新密码
	passwordUpdate:function(userInfo,resolve,reject){
        mm.request({
        url:mm.getServerUrl('/user/reset_password.do'),
	     data:userInfo,
	     method:'POST',
	     success:resolve,
	     error:reject
       })
	},
};
module.exports=user;