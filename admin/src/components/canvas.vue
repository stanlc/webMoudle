/*
* @Author: 世尘
* @Date: 2019-12-15 15:37:52
* @Last Modified by: 世尘
* @Last Modified time: 2020-01-03 15:38:56
* @描述：路通项目中显示百分比占比的环状图例
* @参数 width: String, // 长宽
*       color: String, // 画出的颜色
*       deg: Number, // 度数
*       txt: Number // 中间显示的文字
*/
<template>
  <canvas id="myCanvas" ref="myCanvas" :style="'width:' + width + ';height:' + width">
    当前浏览器不支持canvas
  </canvas>
</template>

<script>
export default {
  name: 'LCanvas',
  props: {
    width: String,
    color: String,
    deg: Number,
    txt: Number
  },
  mounted() {
    console.log(this.txt)
    this.draw()
  },
  watch: {
    txt(newValue, oldValue) {
      this.draw()
    }
  },
  methods: {
    draw() {
      // let canvas = document.getElementById('myCanvas')
      let canvas = this.$refs.myCanvas
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetWidth
      let width = canvas.offsetWidth
      let r = width * 0.8 / 2
      let ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth = 0.5
      ctx.strokeStyle = this.color
      // 绘制圆的路径**
      ctx.arc(width / 2, width / 2, r, 0, Math.PI * 2, false)
      // 0°是从三点钟方向开始的
      // 描边路径
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.strokeStyle = this.color
      ctx.lineCap = 'round'
      ctx.arc(width / 2, width / 2, r, Math.PI * 2 * -0.25, Math.PI * 2 * (this.deg - 0.25), false)
      ctx.stroke()

      ctx.beginPath()
      ctx.lineWidth = 6
      ctx.strokeStyle = this.color
      ctx.lineCap = 'round'
      // 绘制圆的路径**
      ctx.arc(width / 2, width / 2, r, Math.PI * 2 * (this.deg - 0.25), Math.PI * 2 * (this.deg - 0.25), false)
      // 0°是从三点钟方向开始的
      // 描边路径
      ctx.stroke()

      ctx.beginPath()
      ctx.fillStyle = '#FFF'
      ctx.font = 'bold 1rem 黑体'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.txt || 0, width / 2, width / 2, 50)
    }
  }
}
</script>

<style>
</style>
