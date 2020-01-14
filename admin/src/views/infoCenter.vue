<template>
    <div class="div">
    <div class="main">
        <el-row :gutter="20" >
            <el-col :span="6">
                <div class="grid-content bg-purple">
                        <div class="status">
                            <el-button type="text" icon="el-icon-more" class="more" ></el-button>
                            <device-status class="cav"></device-status>
                        </div>
                        <div class="count">
                            <el-button type="text" icon="el-icon-more" class="more" ></el-button>
                            <device-count></device-count>
                        </div>
                        <div class="monitor">
                        <el-button type="text" icon="el-icon-more" class="more" ></el-button>
                        <log-count class="logecharts"></log-count>
                        </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-light">
                    <div class="map">
                     <china-map></china-map>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    </div>
</template>

<script>
    import deviceStatus from '../echarts/DeviceStatus'
    import deviceCount from '../echarts/DeviceCount'
    import LogCount from '../echarts/LogCount'
    import ChinaMap from '../echarts/ChinaMap'
    export default {
        components:{LogCount,deviceStatus,deviceCount,ChinaMap}
    }
</script>

<style lang="scss" scoped>
  .main{
      position: relative;
      top: 50px;
      left: 20px;
  }
  .monitor{
    background: url(../assets/img/logCount.png) no-repeat;
    background-size:100%;
    width: 20vw;
    height: 13vw; 
    display:flex;
    justify-content: center;
    align-items: center; 
    position: relative; 
    margin-top: 25px;
  }
  .more{
    position: absolute;
    top:10px;
    right:15px;
    font-size: 18px;
    color: #00ffff;
    z-index: 2;
  }
  
  .div{
    background: 	#778899;
    height: 92vh;
  }
  .grid-content {
    border-radius: 4px;
    height: 74vh;
  }
  .status{
    background: url(../assets/img/deviceStatus.png) no-repeat;
    background-size:contain;
    width: 20vw;
    height: 10vw; 
    display: -moz-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -moz-box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -moz-box-pack: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    /*for ie9*/
    justify-content: center;
    position: relative;
    padding-top: 5px;
  }
   .count{
    background: url(../assets/img/deviceCount.png) no-repeat;
    background-size:100%;
    width: 20vw;
    height: 14vw;
    display:flex;
    justify-content: center;
    align-items: center; 
    position: relative; 
    margin-top: 25px;
  }
  .map{
    position: relative;
  }
</style>