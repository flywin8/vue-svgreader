<template>
  <div id="app">
    <svg-reader :viewers="viewers"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      viewers: {
        txt: '杨万里yangwangli', // 水印文字
        // width: '700px',
        // height: '500px',
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
