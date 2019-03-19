# vue-svgreader

[![NPM version](https://img.shields.io/npm/v/vue-svgreader.svg?style=flat)](https://www.npmjs.com/package/vue-svgreader) [![NPM downloads](https://img.shields.io/npm/dm/vue-svgreader.svg)](https://www.npmjs.com/package/vue-svgreader) [![MIT](https://img.shields.io/npm/l/vue-svgreader.svg)](https://www.npmjs.com/package/vue-svgreader) [![Git Size](https://img.shields.io/github/languages/code-size/flywin8/vue-svgreader.svg?maxAge=2592000)](https://github.com/flywin8/vue-svgreader) 

> 这是一个基于VUE的SVG文件阅读器插件，实现自定义水印、自定义尺寸、放大、缩小、滚动、翻页、全屏等功能

##有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 德通电气
* 邮件：(flywin#vip.qq.com, 把#换成@)
* QQ: 2229390
* github: [vue-svgreader](https://github.com/flywin8/vue-svgreader).

## 使用说明

### 安装组件
```javascript
npm install vue-svgreader
```
[![vue-svgreader](https://nodei.co/npm/vue-svgreader.png)](https://www.npmjs.com/package/vue-svgreader)

### 在组件中使用
```javascript
import SvgReader from 'vue-svgreader'
export default {
  components: {
    SvgReader
  },
  data () {
    return {
      viewers: {
        txt: '水印文字',
        width: '700px', // 阅读器宽度默认860px
        height: '500px', // 阅读器高度默认700px
        defaultZoom: false, // 默认不可以缩小
        defaultLoadPage: 3, // 默认加载中页数是3
        nextloadPage: 3, // 每次点击继续浏览加载页数是3
        files: [
          require('./assets/1.svg'),
          require('./assets/2.svg'),
          require('./assets/3.svg'),
          require('./assets/4.svg')
        ]
      }
    }
  }
}
```

### 全局注册组件
```javascript
import SvgReader from 'vue-svgreader'
Vue.use(SvgReader)
```

### 在组件中使用
```html
<template>
  <div id="app">
    <svg-reader :viewers="viewers"></svg-reader>
  </div>
</template>
```
