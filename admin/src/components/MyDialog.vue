<template>
        <el-dialog
        :title="title.firstTitle"
        :visible.sync="dialogVisible"
        width="40%"
        @close="clearValidate('myForm')">
        <!-- <el-dialog
        width="40%"
        title="请选择经纬度"
        :visible.sync="sameinnerVisible"
        append-to-body>
        <vue-amap @func="getLng" @closefunc="closeMap"></vue-amap>
        </el-dialog> -->
        <span class="blue">{{title.secondTitle}}</span>
        <el-form label-position="right" :inline="true" label-width="90px" :model="inputForm" ref="myForm" :rules="rules">
            <el-form-item v-for="item in form" :key="item.index" :label="item.label" :prop="item.prop">
                <el-input :v-model="item.inputForm"></el-input>
            </el-form-item>
            <el-form-item label="地图定点:">
                <el-button type="success" icon="el-icon-map-location" @click="innerVisible=true" class="choose-btn">选择经纬度</el-button>
            </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary" >确认</el-button>
            <el-button @click="dialogVisible =false;clearValidate('form')" type="primary">取 消</el-button>
        </span> -->
        </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                inputForm: {}
            }
        },
        props:{
            //标题
            title:Object,
            //选项
            form:Array,
            dialogVisible:Boolean,
            rules:Object,
        }
    }
</script>

<style lang="scss" scoped>

</style>