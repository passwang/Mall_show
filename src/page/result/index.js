/*
* @Author: Administrator
* @Date:   2017-09-11 15:29:35
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-13 03:54:42
*/
require('page/common/nav-simple/index.js');
require('page/common/footer/index.js');
require("./index.css");
var mm=require("util/mm.js");
$(function(){
	var type=mm.getUrlParam("type")||'default';
	$('.'+type+'-success').show();
})