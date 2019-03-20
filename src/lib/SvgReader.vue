<template>
  <div :class="SvgReaderClass" :style="viewerStyle" ref="SvgReader">
    <div class="header">
      <button v-if="isFullscreen" class="btn" @click="onFullScreen(false)" title="恢复窗口">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-quxiaoquanping"></use>
        </svg>
      </button>
      <button v-else class="btn" @click="onFullScreen(true)" title="全屏显示">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-quanping"></use>
        </svg>
      </button>
      <button class="btn" :style="maxStyle" @click="onZoom(true)" title="放大" :disabled="disableMax">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fangda"></use>
        </svg>
      </button>
      <button
        class="btn"
        :style="minStyle"
        @click="onZoom(false)"
        title="缩小"
        :disabled="disableMin"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-suoxiao"></use>
        </svg>
      </button>
      <span class="page">{{ pageContent }}</span>
    </div>
    <div class="body" :style="bodyStyle">
      <ul class="svgImage">
        <li v-for="(item,index) of viewerFiles" :key="index">
          <img :src="item" type="image/svg+xml">
        </li>
        <li>
          <button v-if="showLoadMore" class="btn loadmore" @click="onLoadMore()">
            浏览更多
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import iconfont from './iconfont.js'
import gwm from 'gwm'
export default {
  name: 'SvgReader',
  props: {
    viewers: {
      type: Object,
      default: () => {
        return {
          txt: '水印文字',
          width: '860px',
          height: '700px',
          defaultZoom: false, // 默认不可以缩小
          defaultLoadPage: 3, // 默认加载页数
          nextloadPage: 3, // 继续浏览加载页数
          files: []
        }
      }
    }
  },
  data () {
    return {
      width: '860px',
      height: '700px',
      currentPage: 1,
      LoadPage: 3,
      zoom: 1,
      isFullscreen: false,
      disableMax: false,
      disableMin: true,
      w_unit: '',
      h_unit: ''
    }
  },
  created () {
    this.w_unit = this.watermark.width.match(/(px|%)$/ig)[0] || 'px'
    this.h_unit = this.watermark.height.match(/(px|%)$/ig)[0] || 'px'
    this.width = parseInt(this.watermark.width)
    this.height = parseInt(this.watermark.height)
    this.LoadPage = this.watermark.defaultLoadPage
    this.disableMin = !this.watermark.defaultZoom
    console.log(this.disableMin)
  },
  mounted () {
    const txt = this.watermark.txt
    gwm.creation({
      txt: txt,
      mode: 'svg',
      watch: true,
      fontSize: 18,
      color: '#000',
      font: 'sans-serif',
      alpha: 0.1,
      angle: -15,
      container: '.SvgReader .svgImage'
    })
    const svgbody = window.document.querySelector('.SvgReader .body')
    svgbody.addEventListener('scroll', this.onbodyScroll)
    window.addEventListener('resize', this.onDocumentResize)
  },
  computed: {
    SvgReaderClass () {
      return this.isFullscreen ? 'SvgReader FullScreen' : 'SvgReader'
    },
    pageContent () {
      return this.currentPage + ' / ' + this.watermark.files.length
    },
    viewerStyle () {
      if (this.w_unit === '%' && this.width === 100) {
        return ''
      }
      return 'width:' + this.width + this.w_unit
    },
    bodyStyle () {
      let clientHeight = document.documentElement.clientHeight
      let mainHeight = this.h_unit === '%' ? Math.round(this.height / 100 * clientHeight) : parseInt(this.height)
      return 'height:' + (mainHeight - 50) + 'px'
    },
    maxStyle () {
      return this.disableMax ? 'color:#E2E2E2;' : ''
    },
    minStyle () {
      return this.disableMin ? 'color:#E2E2E2;' : ''
    },
    viewerFiles () {
      return this.watermark.files.slice(0, this.LoadPage)
    },
    watermark () {
      return {
        txt: this.viewers.txt || '水印文字',
        width: this.viewers.width || '860px',
        height: this.viewers.height || '700px',
        defaultZoom: this.viewers.defaultZoom,
        defaultLoadPage: this.viewers.defaultLoadPage || 3,
        nextloadPage: this.viewers.nextloadPage || 3,
        files: this.viewers.files || []
      }
    },
    showLoadMore () {
      return this.LoadPage < this.watermark.files.length
    }
  },
  methods: {
    onZoom (isBig) {
      if (isBig) {
        this.zoom += 0.2
      } else {
        this.zoom -= 0.2
      }
      let width = Math.round(parseInt(this.watermark.width) * this.zoom)
      let clientWidth = document.documentElement.clientWidth
      let px_width = width
      if (this.w_unit === '%') {
        px_width = Math.round(width / 100 * clientWidth)
      }
      clientWidth = clientWidth - 120
      px_width = px_width > clientWidth ? clientWidth : (px_width < 600 ? 600 : px_width)
      this.width = this.w_unit === '%' ? width : px_width
      this.disableMax = px_width === clientWidth
      this.disableMin = px_width === 600
      if (!this.watermark.defaultZoom) {
        this.disableMin = this.width === parseInt(this.watermark.width)
      }
    },
    onFullScreen (isFull) {
      this.isFullscreen = isFull
      this.disableMax = isFull
      this.disableMin = !this.watermark.defaultZoom || isFull
      this.zoom = 1
      this.onDocumentResize()
    },
    onbodyScroll (event) {
      const height = event.target.scrollHeight
      const scrolltop = event.target.scrollTop
      const page = Math.ceil(scrolltop / (height / this.viewerFiles.length))
      this.currentPage = page == 0 ? 1 : page
    },
    onDocumentResize () {
      let element = window.document.querySelector('.SvgReader')
      let clientWidth = document.documentElement.clientWidth - 5
      let clientHeight = document.documentElement.clientHeight - 5
      if (this.isFullscreen) {
        this.width = this.w_unit === '%' ? 100 : clientWidth
        this.height = this.h_unit === '%' ? 100 : clientHeight
      } else {
        this.width = parseInt(this.watermark.width)
        this.height = parseInt(this.watermark.height)
      }
    },
    onLoadMore () {
      this.LoadPage += this.watermark.nextloadPage
    }
  }
}
</script>
<style scoped lang="scss">
.SvgReader {
  border: 1px solid #cccccc;
  margin: 0 auto;
  overflow: hidden;
  background-color: white;
}
.SvgReader.FullScreen {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: white;
}
.header {
  padding: 10px;
  background-color: #f4f9ff;
  display: flex;
  align-content: center;
}
.btn {
  margin: 0 5px;
  cursor: pointer;
  outline: none;
  border: 0;
  background-color: transparent;
  color: #73777a;
}
.btn img {
  height: 25px;
}
.page {
  margin: 0 20px;
  font-size: 20px;
  line-height: 30px;
}
.body {
  border-top: 1px solid #cccccc;
  overflow-y: auto;
  overflow-x: hidden;
}
.svgImage,
.svgImage li {
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: center;
  display: block;
  position: relative;
}
.svgImage img {
  width: 100%;
  border: 1px solid #cccccc;
  border-width: 1px 0px;
}
.icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
.loadmore {
  font-size: 18px;
  line-height: 25px;
  color: #2eae84;
  padding: 5px 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>
