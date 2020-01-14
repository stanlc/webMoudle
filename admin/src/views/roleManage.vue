<template>
<el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>角色管理</span>
        </div>
    <div>
        <el-form :inline="true" :model="searchForm" @submit.native.prevent="search">
                <el-form-item label="角色名称">
                    <el-input v-model="searchForm.roleName" placeholder="请输入要查询的角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="searchForm.roleDesc" placeholder="请输入要查询的角色描述"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">确定</el-button>
                </el-form-item>
        </el-form>
        <el-table :data="listData">
            <el-table-column prop='roleName' label="角色名称" width="120"></el-table-column>
            <el-table-column prop='roleDesc' label="角色描述"></el-table-column>
            <el-table-column prop='createTime' label="创建时间"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="inputForm=scope.row;dialogVisible=true;">编辑</el-button>
                    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="dialogVisible=true;$refs['myForm'] && clearValidate('myForm');">录入角色</el-button>
            </el-form-item>
        </el-form>
        <!-- 录入同级Dialog -->
        <el-dialog
        title="录入角色"
        :visible.sync="dialogVisible"
        width="40%"
        @close="clearValidate('myForm');inputForm={};">
        <!-- <el-dialog
        width="40%"
        title="请选择经纬度"
        :visible.sync="sameinnerVisible"
        append-to-body>
        <vue-amap @func="getLng" @closefunc="closeMap"></vue-amap>
        </el-dialog> -->
        <span class="blue">{{inputForm.organName?'编辑':'新建'}}角色</span>
        <el-form label-position="right"  label-width="90px" :model="inputForm" ref="myForm" :rules="rules" @submit.native.prevent="save">
            <el-form-item label="角色名称:" prop="roleName">
                <el-input v-model="inputForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述:" prop="roleDesc">
                <el-input v-model="inputForm.roleDesc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">确认</el-button>
                <el-button @click="dialogVisible =false;clearValidate('myForm')" type="primary">取 消</el-button>
            </el-form-item>
        </el-form>
        
        </el-dialog>
        <!-- 录入同级Dialog -->
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
    </div>
</el-card>
</template>

<script>
    import rules from '../../validate/rules'
    export default {
        data() {
            return {
                dialogVisible: false,
                sameinnerVisible:true,
                inputForm:{},
                rules:rules,
                listData:[],
                searchForm:{},
                pageNo:1,
                pageSize:5,
            }
        },
        created(){
            this.fetch()
        },
        methods: {
            clearValidate(formName) {
                this.$refs[formName].clearValidate();
            },
            async fetch() {
                const res = await this.$http.get('/role')
                this.listData = res.data
            },
            remove(row){
                this.$confirm(`是否确定删除角色${row.organName}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(async () => {
                        const res = await this.$http.delete(`/role/${row._id}`)
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
            async save(){
                this.inputForm.createTime = this.getTime()
                if(this.inputForm._id){
                     const res = await this.$http.put(`/role/${this.inputForm._id}`,this.inputForm)
                    if(res.data.success){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.fetch()
                    this.dialogVisible = false
                    }
                }else{
                    const res = await this.$http.post('/role',this.inputForm)
                    if(res.data.success){
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                    this.fetch()
                    this.dialogVisible = false
                    }
                }
                
            },
            async search() {
                const res = await this.$http.post('/role/search',this.searchForm)
                this.listData = res.data
                this.searchForm={}
            },
            getTime(){
                let date = new Date() 
                let Y = date.getFullYear() + '年'
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月'
                let D = date.getDate() + '日'
                let H = date.getHours() + '时'
                let Min = date.getMinutes() + '分'
                let S = date.getSeconds() + '秒'
                return Y+M+D+H+Min+S
            },
            //分页
            async changePage(){
                const res = await this.$http.get(`/role/page?pageNo=${this.pageNo}&pageSize=${this.pageSize}`)
                this.listData = res.data
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
        components:{}
    }
</script>

<style lang="scss" scoped>
    .box-card{
        width: 94vw;
    }
</style>