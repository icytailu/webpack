# webpack

- [安装](#安装)
- [配置文件](#配置文件)
- [配置入口以及出口文件](#配置入口以及出口文件)
- [热更新](#热更新)
- [css文件打包](#css文件打包)
- [js文件打包](#js文件打包)
- [html文件打包](#html文件打包)
- [图片处理](#图片处理)
- [css分离](#css分离)
- [通过src引入img](#通过src引入img)
- [打包和分离stylus](#打包和分离stylus)

> WebPack是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言，并将其转换和打包为合适的格式供浏览器使用。

## 安装

```js
npm install -g webpack

npm init
```

会生成一个`package.json`

然后在此文件夹输入

```js
npm install --save-dev webpack
```

**注意**：不可以让`package.json`的`name`为`webpack`

安装后会生成一个package-lock.json文件，用来记录当前状态下实际安装的各个npm package的具体来源和版本号

更新：如果有老项目但是不想把之前的依赖包删除进入package.json中，

```js
 "devDependencies": {
    "webpack": "^3.10.0"
  }
```

版本号改成最新的，然后删除`node_moudules`;在运行 `npm install`就可以了

新建一个文件夹`src` 放所有的源文件夹；

再建一个文件夹`dist` 放所有的生产后的文件

[↑ 返回Top](#webpack)

## 配置文件

> `webpack.config.js`

基本结构

```js

module.exports={
    entry:{},      //入口文件的配置项

    output:{},     //出口文件的配置项

    module:{},    //模块：例如解读CSS,图片如何转换，压缩

    plugins:[],    //插件，用于生产模版和各项功能

    devServer:{} //配置webpack开发服务功能
}

```

[↑ 返回Top](#webpack)

## 配置入口以及出口文件

```js
const path = require('path');
module.exports = {
    entry:{
        entry:'./src/entry.js'
    },
    output:{
        // 绝对路径
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    }
}
```

多入口多出口

```js
entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
},
```

[↑ 返回Top](#webpack)

## 热更新

```js
devServer:{
    contentBase:path.resolve(__dirname,'dist'),
    host:'IP地址（或者localhost）',
    compress:true, //服务器压缩
    port:8000
}
```

`host`尽量用ip地址在终端输入`ipconfig`查看ip地址

运行前需要在开发环境安装`webpack-dev-server`

```js
npm install webpack-dev-server --save-dev
```

安装后发现：

`webpack-dev-server` 不是内部或外部命令，也不是可运行的程序
或批处理文件。

> 这是因为它安装在node_module中，解决办法是在package.json中修改`script`

```js
"scripts": {
    "server": "webpack-dev-server --open"
  }
```

然后在终端运行 `npm run server`

[↑ 返回Top](#webpack)

## css文件打包

- 步骤1：需要两个加载器`style-loader`,`css-loader`
- 步骤2：在`module`中添加`rules`
- 步骤3：引入样式

```js
// 处理url
npm install style-loader --save-dev
// 处理样式，标签
npm install css-loader --save-dev
```

在`module`中添加`rules`

```js
module:{
    rules:[
        {
            test:/\.css$/,
            use:[{
                loader:'style-loader'
            },{
                loader:'css-loader'
            }]
        }
    ]
}
```

在`entry.js`中引入样式

```js
import css from './css/index.css';
```

[↑ 返回Top](#webpack)

## js文件打包

> 一般在生产环境不会压缩，不然难调试

- 步骤1：引入包 `uglifyjs-webpack-plugin`
- 步骤2：在`plugins`中添加`new uglify()`

引入包 `uglifyjs-webpack-plugin`(不用单独npm install)

```js
const uglify = require('uglifyjs-webpack-plugin');
```

在`plugins`中添加`new uglify()`

```js
plugins:[
    new uglify()
]
```

[↑ 返回Top](#webpack)

## html文件打包

- 步骤1：引入包 `html-webpack-plugin`(需要npm install)
- 步骤2：在`plugins`中添加`htmlPlugin`

```js
const htmlPlugin = require('html-webpack-plugin');
```

安装 `html-webpack-plugin`

```js
npm install --save-dev html-webpack-plugin
```

然后在`plugins`添加`htmlPlugin`

```js
 plugins:[
    new htmlPlugin({
        minify:{
            removeAttributeQuotes:true
        },
        hash:true,
        template:'./src/index.html'
    })
]
```

[↑ 返回Top](#webpack)

## 图片处理

安装

```js
npm install --save-dev file-loader url-loader
```

配置

```js
//模块：例如解读CSS,图片如何转换，压缩
module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },{
         test:/\.(png|jpg|gif|jpeg)$/ ,
         use:[{
             loader:'url-loader',
             options:{
                 limit:5000
             }
         }]
      }
    ]
},
```

[↑ 返回Top](#webpack)

## css分离

1、安装 `extract-text-webpack-plugin` 插件

```js
npm install extract-text-webpack-plugin --save-dev
```

在`webpack.config.js`文件引入插件(loader不需要引入，插件必须引入)

```js
const extractTextPlugin = require("extract-text-webpack-plugin")
```

2、在配置文件中导入插件

```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
plugins: [
    new extractTextPlugin('css/index.css')
]
```

分离之后图片路径就不对了，解决办法设置一个绝对路径

```js
const website = {
  publicPath: 'http://192.168.1.109:9527/'
}
// module.exports
 output: {
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    filename: 'bundle.js',
    publicPath: website.publicPath
  },
```

[↑ 返回Top](#webpack)

## 通过src引入img

之前引入图片都是以背景方式才可引入
现在则要用img标签引入，需要用到插件`html-loader`

安装

```js
npm install --save-dev html-loader
```

```js
module: {
rules: [
    {
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
    })
    },{
    test:/\.(png|jpg|gif|jpeg)$/ ,
    use:[{
        loader:'url-loader',
        options:{
            limit:5000,
            outputPath:'images/',
        }
    }]
    }, {
    test: /\.(htm|html)$/i,
    use: [{
        loader: 'html-loader'
    }]
    }
]
},
```

[↑ 返回Top](#webpack)

## 打包和分离stylus

首先安装

```js
npm install stylus-loader stylus --save-dev
```

要在entry.js引入

```js
import stylus from './css/coral.styl';
```

> webpack.config.js

```js
{
    test: /\.styl$/,
    use: extractTextPlugin.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "stylus-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
}
```

[↑ 返回Top](#webpack)