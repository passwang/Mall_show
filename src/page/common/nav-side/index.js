/*
* @Author: Administrator
* @Date:   2017-09-10 08:10:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 15:40:03
*/
require("./index.css");
var mm=require("util/mm.js");
var templateIndex=require("./index.string");
//通用页面头部
var navside={
     options:{
     	name:'',
     	navList:[
           { name:'user-center', desc:'个人中心',href:'./user-center.html' },
           { name:'order-list',  desc:'我的订单',href:'./order-list.html' },
           { name:'pass-update', desc:'修改密码',href:'./pass-update.html' },
           { name:'about',       desc:'关于MALL',href:'./about.html' },

     	]
     },
	init:function(options){
	  $.extend(this.options,options);
	  this.renderNav();
	},
	//渲染html
	renderNav:function(){
       for (var i = 0; i < this.options.navList.length; i++) {
          if (this.options.navList[i].name===this.options.name) {
          	this.options.navList[i].isActive=true;
          }
       };
       //渲染之后结果
       var navHTML=mm.renderHtml(templateIndex,{navList:this.options.navList});
       $(".wrap .nav-list").html(navHTML);
	}
};
module.exports=navside;
