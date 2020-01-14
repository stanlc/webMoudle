<template>
    <el-container>
         <el-aside width="200px">
            <el-menu
            :default-active="$router.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            router
            active-text-color="#ffd04b">
            <el-menu-item index="/deviceList">
                <i class="el-icon-location"></i>
                <span>设备列表</span>
            </el-menu-item>
            <el-menu-item index="/deviceManage">
                <i class="el-icon-menu"></i>
                <span slot="title">设备管理</span>
            </el-menu-item>
            </el-menu>
         </el-aside>
         <router-view/>
    </el-container>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .el-menu{
        height: 92vh;
    }
</style>