import Vue from 'vue'
import App from './App.vue'
import SvgReader from './lib/index'
Vue.use(SvgReader)
new Vue({
  el: '#app',
  render: h => h(App)
})
