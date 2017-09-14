/*
* @Author: Administrator
* @Date:   2017-09-10 02:03:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 12:46:14
*/
require("./index.css");
var mm=require('util/mm.js');
//通用页面头部
var header={
	init:function(){
		this.bindEvent();
	},
	onLoad:function(){
      var keyword=mm.getUrlParam("keyword");
      $("#search-input").val(keyword);
	},
	bindEvent:function(){
          var _this=this;
          $("#search-button").click(function(){
             _this.searchSubmit();
          });
          //按下回车
          $("#search-input").keyup(function(e){
            if (e.keyCode===13) {
            	 _this.searchSubmit();
            }
          })
	},
	searchSubmit:function(){
		var keyword=$.trim($("#search-input").val());
		if (keyword) {
			window.location.href='./list.html?keyword='+keyword;
		}
		else{
			mm.goHome();
		}
	}
}
header.init();