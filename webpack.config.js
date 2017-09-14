/*
* @Author: Administrator
* @Date:   2017-09-06 10:18:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-14 13:53:08
*/
var path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require("webpack");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
//环境变量的配置
var WEBPACK_ENV=process.env.WEBPACK_ENV||'dev';
console.log( WEBPACK_ENV);
var returndata=function returnplugin(name,title){
	return ({
       	template:'./src/view/'+name+'.html',
       	filename:'view-show/'+name+'.html',
        title:title,
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
		'login':['./src/page/login/index.js'],
    'result':['./src/page/result/index.js'],
    'register':['./src/page/register/index.js'],
    'pass-reset':['./src/page/pass-reset/index.js'],
    'user-center':['./src/page/user-center/index.js'],
    'user-update':['./src/page/user-update/index.js'],
    'pass-update':['./src/page/pass-update/index.js']

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
           	test:/\.(jpg|png|gif|woff|svg|eot|ttf|woff2)$/,
           	use:'url-loader?limit=1000&name=images/[name].[ext]'
           },
            {
            test:/\.string$/,
            use:'html-loader'
           }
          
        ]
	},
  resolve:{
    alias:{
       node_modules:path.resolve(__dirname ,'./node_modules'),
        util       :path.resolve(__dirname , './src/util'),
         page      :path.resolve(__dirname , './src/page'),
          service  :path.resolve(__dirname ,'./src/service'),
           image   :path.resolve(__dirname ,'./src/image')

    }
  },
	plugins:[
       new webpack.optimize.CommonsChunkPlugin({
       	name:'common',
       	filename:'js/base.js'
       }),
       new ExtractTextPlugin('css/[name].css'),
       new htmlWebpackPlugin(returndata('index','mall首页')),
       new htmlWebpackPlugin(returndata('login','登录')),
       new htmlWebpackPlugin(returndata('register','注册')),
       new htmlWebpackPlugin(returndata('result','结果返回页')),
       new htmlWebpackPlugin(returndata('pass-reset','找回密码')),
      new htmlWebpackPlugin(returndata('user-center','个人中心')),
      new htmlWebpackPlugin(returndata('user-update','修改个人信息')),
     new htmlWebpackPlugin(returndata('pass-update','修改密码'))

	]

};

if ('dev'===WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}

module.exports=config;