# webpack

- [安装](#安装)
- [配置文件](#配置文件)
- [配置入口以及出口文件](#配置入口以及出口文件)
- [热更新](#热更新)
- [css文件打包](#css文件打包)
- [js文件打包](#js文件打包)
- [html文件打包](#html文件打包)

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

### 以上方式是把样式引入到js中的但是不推荐，另一种解决方案

1、安装 `extract-text-webpack-plugin` 插件

```js
npm install extract-text-webpack-plugin --save-dev
```

2、在配置文件中导入插件

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