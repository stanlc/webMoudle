/*
* @Author: 世尘
* @Date: 2019-12-15 15:37:52
* @Last Modified by: 世尘
* @Last Modified time: 2020-01-03 15:38:56
* @参数 title // 名字
*       width // 宽度（带单位，如：px、rem、%）
*       height // 高度（带单位，如：px、rem、%）
* @注意 背景图片分为头中底三部分
*/
<template>
  <div class="divAll" :style="'width:' + width">
    <div class="divHeader">
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="divCenter" :style="'height:' + height">
      <slot></slot>
    </div>
    <div class="divFoot"></div>
  </div>
</template>

<script>
export default {
  name: 'Capsule',
  props: ['title', 'width', 'height'],
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.divAll{
  color: white;
  // display: inline-block;
  margin-top: 0.533333rem;
  min-width: 20rem;
  .divHeader{
    height: 1.9rem;
    background: url(../../../img/2.png) 100% 100% no-repeat;
    background-size: 100% 100%;
    .title{
      color: #00FFFF;
      width: 28%;
      text-align: center;
      line-height: 2rem;
      white-space: nowrap;
    }
  }
  .divCenter{
    // height: 4rem;
    // padding: 0 1rem;
    background-image: url(../../../img/4.png);
    background-repeat: repeat;
    background-size: 100%;
  }
  .divFoot{
    height: 1rem;
    background: url(../../../img/3.png) 100% 100% no-repeat;
    background-size: 100% 100%;
  }
}
</style>
