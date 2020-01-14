<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>设备列表</span>
        </div>
        <div>
            <el-form :inline="true" :model="searchForm" @submit.native.prevent="search">
                <el-form-item label="设备名称">
                    <el-input v-model="searchForm.name" placeholder="请输入要查询的设备名称"></el-input>
                </el-form-item>
                <el-form-item label="设备别名">
                    <el-input v-model="searchForm.nickName" placeholder="请输入要查询的设备别名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">确定</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="deviceData" :height="tableHeight" ref="table">
                <el-table-column prop='name' label="设备名称" width="120"></el-table-column>
                <el-table-column prop='nickName' label="设备别名"></el-table-column>
                <el-table-column prop='status' label="设备状态"></el-table-column>
                <el-table-column prop='mac' label="设备MAC" width="120"></el-table-column>
                <el-table-column prop='organ' label="组织机构"></el-table-column>
                <el-table-column prop='address' label="所属地址"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope"> 
                        <el-button size="small" type="primary" @click="$router.push(`/deviceManage/edit/${scope.row._id}`)">编辑</el-button>
                        <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
            :page-sizes="[5, 10, 15,20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes,jumper"
            background>
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                deviceData: [],
                tableHeight:500,
                searchForm:{},
                pageNo:1,
                pageSize:5,
            }
        },
        components:{},
        created(){
            this.fetch()
            this.changePage()
        },
        mounted(){
            this.tableChange()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/device')
                this.deviceData = res.data
            },
            async search() {
                const res = await this.$http.post('/device/search',this.searchForm)
                this.deviceData = res.data
                this.searchForm={}
            },
            remove(row){
                this.$confirm(`是否确定删除设备${row.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(async () => {
                        const res = await this.$http.delete(`/device/${row._id}`)
                        if(res.data.success){
                                this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.fetch()
                        }else{
                             this.$message({
                                type: 'danger',
                                message: '删除失败!'
                            });
                        }
                        
                    })
            },
            tableChange(){
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 0.3*window.innerHeight;
                
                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 0.3*window.innerHeight
                }
            })
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    　　　　 //240表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
            }, 
            async changePage(){
                const res = await this.$http.get(`/device/page?pageNo=${this.pageNo}&pageSize=${this.pageSize}`)
                this.deviceData = res.data
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.changePage()
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.changePage()
            },  
        },
    }
</script>

<style >
</style>