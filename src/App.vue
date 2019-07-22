<!--
 * @Description: 测试
 * @Date: 2019-01-03 15:37:14
 * @Author: 肖立君
 * @LastEditTime: 2019-07-22 14:14:05
 * @LastEditors: 肖立君
 -->
<template>
  <div id="app">
    <div class="box">
      <svg-reader :viewers="viewers" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      dialogTableVisible: false,
      viewers: {
        txt: '水印文字', // 水印文字
        // defaultZoom: false,
        // showFullscreen: false,
        width: '90%',
        height: '700px',
        // innerZoom: true,
        files: [
          require('./assets/1.svg'),
          require('./assets/2.svg'),
          require('./assets/3.svg'),
          require('./assets/4.svg'),
          require('./assets/5.svg'),
          require('./assets/6.svg'),
          require('./assets/7.svg'),
          require('./assets/8.svg'),
          require('./assets/9.svg')
        ]
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px 30px;
}
.box {
  position: relative;
  width: 100%;
  height: 800px;
  margin: 0 auto;
  background: grey;
}
</style>
