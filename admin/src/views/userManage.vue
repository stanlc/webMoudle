<template>
<el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>机构管理</span>
        </div>
    <div>
        <el-form :inline="true" :model="searchForm" @submit.native.prevent="search">
                <el-form-item label="角色名称">
                    <el-input v-model="searchForm.userName" placeholder="请输入要查询的用户名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="searchForm.logName" placeholder="请输入要查询的登录名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">确定</el-button>
                </el-form-item>
        </el-form>
        <el-table :data="listData">
            <el-table-column prop='userName' label="用户名称" width="120"></el-table-column>
            <el-table-column prop='logName' label="登录名称"></el-table-column>
            <el-table-column prop='roleName' label="所属角色"></el-table-column>
            <el-table-column prop='phone' label="手机号码" width="120"></el-table-column>
            <el-table-column prop='email' label="电子邮箱"></el-table-column>
            <el-table-column prop='organName' label="机构名称"></el-table-column>
            <el-table-column prop='createTime' label="创建时间"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="sameLevelForm=scope.row;sameDialogVisible=true;">编辑</el-button>
                    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="sameDialogVisible=true;$refs['sameLevelForm'] && clearValidate('sameLevelForm');">录入用户</el-button>
            </el-form-item>
        </el-form>
        <!-- 录入同级Dialog -->
        <el-dialog
        title="录入用户"
        :visible.sync="sameDialogVisible"
        width="40%"
        @close="clearValidate('sameLevelForm');sameLevelForm={};">
        <!-- <el-dialog
        width="40%"
        title="请选择经纬度"
        :visible.sync="sameinnerVisible"
        append-to-body>
        <vue-amap @func="getLng" @closefunc="closeMap"></vue-amap>
        </el-dialog> -->
        <span class="blue">{{sameLevelForm.organName?'编辑':'新建'}}用户</span>
        <el-form @submit.native.prevent="save" label-position="right"  label-width="90px" :model="sameLevelForm" ref="sameLevelForm" :rules="rules">
            <el-form-item label="用户名称:" prop="userName">
                <el-input v-model="sameLevelForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="登录名称:" prop="logName">
                <el-input v-model="sameLevelForm.logName"></el-input>
            </el-form-item>
            <el-form-item label="所属角色:" prop="roleName">
                <el-input v-model="sameLevelForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="sameLevelForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱:" prop="email">
                <el-input v-model="sameLevelForm.email"></el-input>
            </el-form-item>
            <el-form-item label="机构名称:" prop="organName">
                <el-input v-model="sameLevelForm.organName" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">确认</el-button>
                <el-button @click="sameDialogVisible =false;clearValidate('sameLevelForm')" type="primary">取 消</el-button>
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
                sameDialogVisible: false,
                sameinnerVisible:true,
                sameLevelForm:{},
                rules:rules,
                listData:[],
                sameLevelForm:{},
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
                const res = await this.$http.get('/user')
                this.listData = res.data
            },
            remove(row){
                this.$confirm(`是否确定删除用户${row.userName}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(async () => {
                        const res = await this.$http.delete(`/user/${row._id}`)
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
                this.sameLevelForm.createTime = this.getTime()
                if(this.sameLevelForm._id){
                     const res = await this.$http.put(`/user/${this.sameLevelForm._id}`,this.sameLevelForm)
                    if(res.data.success){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.fetch()
                    this.sameDialogVisible = false
                    }
                }else{
                    const res = await this.$http.post('/user',this.sameLevelForm)
                    if(res.data.success){
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                    this.fetch()
                    this.sameDialogVisible = false
                    }
                }
                
            },
            async search() {
                const res = await this.$http.post('/user/search',this.searchForm)
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
                const res = await this.$http.get(`/user/page?pageNo=${this.pageNo}&pageSize=${this.pageSize}`)
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