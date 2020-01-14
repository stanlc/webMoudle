<template>
  <div class="home">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="/deviceCenter">设备中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">系统管理</template>
        <el-submenu index="2-1">
          <template slot="title">组织机构</template>
          <el-menu-item index="/organManage">机构管理</el-menu-item>
          <el-menu-item index="/roleManage">角色管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/userManage">人员管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/infoCenter">消息中心</el-menu-item>
      <el-menu-item index="/video">视频监控</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang='scss'>
    //Table样式
body .el-table th.gutter{
  display: table-cell!important;  //浏览器缩放表头出现白边
}

.el-table {
  background: transparent !important; //表格背景色
  tr th{
    background: #426ab3 !important;    //表头背景色
    border: none !important;  //表头下边框
    text-align: center;
    
  }
  thead tr{
    background: transparent
  }
  tbody tr{
    &:nth-child(odd){
      background: rgba(14,59,128,0.3);    
    }
   
    &:nth-child(even){
      background: transparent;
    }
    td{
      border: none;
      text-align: center;
      color: #fff;
    }
  }
}  
.el-table::before{
  height: 0px !important;   //表格下边框
}

.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #212e3e !important;    //hover项背景颜色
}

  .el-table  thead{
      color: #15d3da !important;
      
  }
  
 @import '../assets/common.css'
</style>
