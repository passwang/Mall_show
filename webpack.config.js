/*
* @Author: Administrator
* @Date:   2017-09-06 10:18:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-09 09:56:27
*/
var path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require("webpack");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
//环境变量的配置
var WEBPACK_ENV=process.env.WEBPACK_ENV||'dev';
console.log( WEBPACK_ENV);
var returndata=function returnplugin(name){
	return ({
       	template:'./src/view/'+name+'.html',
       	filename:'view-show/'+name+'.html',
       	inject:'body',
       	hash:true,
       	chunks:['common',name]
       });
}


var config={
	context:__dirname,
	entry:{
		'common':['./src/page/common/index.js'],
		'index':['./src/page/index/index.js'],
		'login':['./src/page/login/index.js']
	},
	output:{
        path:path.resolve(__dirname,'./dist'),
        publicPath:'/dist',
        filename:'js/[name].js'
       
	},
	externals:{
		'jquery':'window.jQuery'
	},
	module:{
        rules:[
         {
         	test:/\.css$/,
         	use: ExtractTextPlugin.extract({
         		fallback:'style-loader',
               use:'css-loader',
               publicPath:'../'
         	})
           },

           {
           	test:/\.(jpg|png|gif)$/,
           	use:'url-loader?limit=1000&name=images/[name].[ext]'
           		
           
           }
        
        ]
	},
	plugins:[
       new webpack.optimize.CommonsChunkPlugin({
       	name:'common',
       	filename:'js/base.js'
       }),
       new ExtractTextPlugin('css/[name].css'),
       new htmlWebpackPlugin(returndata('index')),
       new htmlWebpackPlugin(returndata('login'))

	]

};if ('dev'===WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}

module.exports=config;