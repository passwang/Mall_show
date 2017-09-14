/*
* @Author: Administrator
* @Date:   2017-09-11 08:10:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-12 15:50:37
*/
//定义工具类
var Hogan=require("hogan.js");
var conf={
	serverHost:''
};

var mm={
    request:function(param){
      var _this=this;
      $.ajax({
         type:    param.method ||'get',
         url :    param.url||'',
         dataType:param.type||'json',
         data:    param.data||'',
         success: function(res){
         	//没有登录,强制登录
           if (res.status==10) {
             _this.doLogin();
           }
           //请求成功
           else if (res.status==1) {
           typeof param.success==='function'&& param.success(res.data,res.msg);
           }
           //请求数据出错
           else if (res.status==0) {
             typeof param.error==='function'&& param.error(res.msg);
           }
         },
         //请求失败
         error:  function(error){
           typeof param.error==='function'&& param.error(error.statusText);
         }
      })
    },
    //获取服务器地址
    getServerUrl:function(path){
         return conf.serverHost+path;
    },
    //获取url参数
    getUrlParam:function(name){
      var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
       var result=window.location.search.substr(1).match(reg);
       return result? decodeURIComponent(result[2]):null;
    },
    //渲染html模板
    renderHtml:function(htmlTemplate,data){
       var template=Hogan.compile(htmlTemplate);
       var result=template.render(data);
       return result;
    },
    //成功提示
    successTips:function(msg){
        alert(msg || '操作成功!');
    },
     //错误提示
    errorTips:function(msg){
        alert(msg || '操作失败!');
    },
    //表单验证,非空，手机，邮箱
    validate:function(value,type){
     var value=$.trim(value);
     if ('required'===type) {
         if (value==='') {
           return true;
         }
         else
          return false;
     
     };
     if ('phone'===type) {
     	  return /^1\d{10}$/.test(value);
     };
     if ('email'===type) {
     	return (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/).test(value);
     };

    },
    doLogin:function(){
    	window.location.href='./login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    goHome:function(){
    	window.location.href='./index.html';
    }
};

module.exports=mm;