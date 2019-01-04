import SvgReader from './SvgReader.vue'
SvgReader.install = function (Vue) {
  Vue.component(SvgReader.name, SvgReader)
  // global 情况下 自动安装
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SvgReader)
  }
}
// 导出模块
export default SvgReader
