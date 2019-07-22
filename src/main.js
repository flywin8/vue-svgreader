/*
 * @Description: 主文件
 * @Date: 2019-01-03 15:37:14
 * @Author: 肖立君
 * @LastEditTime: 2019-07-22 11:57:45
 * @LastEditors: 肖立君
 */
import Vue from 'vue'
import App from './App.vue'
import SvgReader from './lib/index'
Vue.use(SvgReader)
new Vue({
  el: '#app',
  render: h => h(App)
})
