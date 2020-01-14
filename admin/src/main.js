import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http'
import VueAMap from 'vue-amap';
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video 

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '632fc907671acd23df063076928b7747',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.prototype.$http = http
Vue.config.productionTip = false

//引入echarts
var echarts = require('echarts');
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
