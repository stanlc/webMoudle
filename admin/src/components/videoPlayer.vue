 <!-- 
先安装
npm install  video.js --save
npm  install videojs-contrib-hls --save
使用时在main.js中引入
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video 
在本页面
import videojs from "video.js"
import "videojs-contrib-hls"  使用后缀为.m3u8的视频url
-->
 <template>
  <div class="wrap" v-if="reFresh">
    <video id="myVideo" class="video-js">
      <source :src="this.url" type="application/x-mpegURL" />
      <!--后缀为.m3u8的视频 type改为application/x-mpegURL-->
    </video>
  </div>
</template>

    <script>
/* eslint-disable */
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  props: {
    url: String //需要传的参数
  },
  data() {
    return {
      reFresh: true
    };
  },
  watch: {
    url() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
      });
    }
  },
  mounted() {
    if (this.reFresh == true&&this.url!='') {
      this.initVideo();
    }
  },
  updated() {
    if (this.reFresh == true) {
      this.initVideo();
    }
  },
  methods: {
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "100%",
        //设置视频播放器的显示高度（以像素为单位）
        height: "100%"
      });
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  position: relative;
  padding-bottom: 62%; /*需要用padding来维持16:9比例,也就是9除以16*/
  height: 0;
}

#myVideo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
