# 动态生成用于网页JS调试的日志
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

日志通常用户定位用户问题的时候使用，我们常常需要发布前就在代码中设计好业务关键流程执行时需要打印的日志。否则，当我们需要定位问题的时候，才发现自己并没有输出相关的日志，这样就会比较被动。这个时候只好临时改代码加日志，重新发布。有没有一种方案，可以在遇到问题的时候，再去代码中相应位置加日志，用户执行改业务流程时就能立刻打印出相关日志，而不用重新走一遍发布流程。

woodpecker-log 提供了一种解决方案，将浏览器JS请求代理到目标服务器，修改JS并发布到目标服务器后你可以在用户端随意打印上报用于调试的log。前提是针对特定JS目标、特定用户生效。

## ⚠️ 注意
当前还未被生成环境大规模验证，线上请谨慎使用。

### [DEMO 地址](http://www.00985.vip/woodpecker/)
### 安装
#### 通过 `script` 外链标签引用

将 [dist/wp-log.umd.js](https://github.com/and80506/woodpecker/blob/master/dist/wp-log.umd.js) 直接内联到 `<head>` 标签中，并置于**所有资源开始加载之前**。

#### 通过 `script` 内联标签引用

使用webpack等打包工具，直接将npm库上的wp-log内容使用script标签包裹后置于html的 `<head>` 标签中。

### 配置
提供regex参数以正则匹配待调试JS的path部分，得到待调试目标JS数组后，辅助protocol、host参数以替换成代理服务器JS地址。
    foo://example.com:8042/over/there?name=ferret#nose
    \_/   \______________/\_________/ 
     |           |            |       
  protocol     host          path    
- path: 数组类型，表示path匹配规则，遍历数组内对象，使用regex匹配待调试JS，然后以replace(regex, value)的方式尝试替换目标JS。必选参数。
- protocol: 字符串类型，指定代理后JS地址的协议。如`http:`表示将以http协议从代理服务器上加载JS。可选参数。
- host: 对象类型，表示将对象key替换为对象value。如`{'example.com': 'log-server.com'}`表示将example.com的JS代理到log-server.com。可选参数。
- logLevel: 字符串类型，`'debug', 'info', 'warn', 'error', 'silent'`。 默认`'info'`。可选参数。
- logProvider: logProvider，，默认`window.console`。可选参数。

### 快速上手
安装SDK后，简单初始化待调试目标JS的path规则及代理JS地址规则即可。使用以下配置，`http://localhost:5000/js/script-1.js`将被代理成`http://my-log-server.com/js/script-1.log.js`
```html
<script src="../dist/wp-log.umd.js" type="text/javascript"></script>
<script>
    Woodpecker.init({
        path: [
            {
                regex : /\/js\/script-[1,3]/,
                value: '/js/script-1.log',
            },
            {
                regex : /\/js\/script-on-need-1/,
                value: '/js/script-on-need-1.log'
            },
            {
                regex : /\/js\/script-on-need-3/,
                value: '/js/script-on-need-3.log'
            }
        ],
        host: {
            'localhost:5000': 'my-log-server.com',
        },
        protocol: 'http:',
        logLevel: 'debug'
    });
</script>
```
### Demo
安装依赖并启动本地server服务:
```bash
$ npm i
$ npm run build
$ npm run examples
```
查看Demo，本地浏览器打开http://localhost:5000/demo/
查看示例项目realworld example, http://localhost:5000/examples/realworld/dist/
### 可运行示例项目
执行Demo的npm脚本，另外再进入examples/realworld项目内运行打包脚本。
```bash
# 打包原始JS，得到bundle.js
cd examples/realworld
$ npm run build
# 修改原始JS添加log`console.log('test woodpecker-log😁')`，打包后得到bundle.log.js
cd examples/realworld/src/pages/Home/index.js
$ npm run log
```
### 测试
运行单测及端到端测试:
```bash
$ npm i
$ npm run lint
$ npm run build
$ npm test
$ npm run e2e
```

### 浏览器兼容性

| <img src="./demo/images/chrome.png" width="48px" height="48px" alt="Chrome logo"> | <img src="./demo/images/safari.png" width="48px" height="48px" alt="Safari logo"> | 
| :--------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :-------------------------------------------------------: | :----------------------------------------------------------------------------: |
|                                    47+ ✔                                     |                                  15+ ✔                                   |                                     32+ ✔                                      |                                        10+ ✔                                        |                                   34+ ✔                                    |                                    10+ ✔                                     |                           10+ ✔                           |                                     4.4+ ✔                                     |

### 使用许可
The MIT License (MIT)