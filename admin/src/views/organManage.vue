<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>机构管理</span>
        </div>
    <div>
        <el-form :inline="true" :model="searchForm" @submit.native.prevent="search">
                <el-form-item label="机构名称">
                    <el-input v-model="searchForm.organName" placeholder="请输入要查询的机构名称"></el-input>
                </el-form-item>
                <el-form-item label="机构描述">
                    <el-input v-model="searchForm.organDesc" placeholder="请输入要查询的机构别名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">确定</el-button>
                </el-form-item>
        </el-form>
        <el-table :data="organData">
            <el-table-column prop='organName' label="机构名称" width="120"></el-table-column>
            <el-table-column prop='organDesc' label="机构描述"></el-table-column>
            <el-table-column prop='organPerson' label="负责人"></el-table-column>
            <el-table-column prop='phone' label="联系电话" width="120"></el-table-column>
            <el-table-column prop='latitude' label="机构纬度"></el-table-column>
            <el-table-column prop='longitude' label="机构经度"></el-table-column>
            <el-table-column prop='parent' label="上级机构"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope"> 
                    <el-button size="small" type="primary" @click="sameLevelForm=scope.row;sameDialogVisible=true;">编辑</el-button>
                    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="sameDialogVisible=true;$refs['sameLevelForm'] && clearValidate('sameLevelForm');">录入机构</el-button>
            </el-form-item>
        </el-form>
        <!-- 录入同级Dialog -->
        <el-dialog
        title="录入机构"
        :visible.sync="sameDialogVisible"
        width="40%"
        @close="clearValidate('sameLevelForm');sameLevelForm={};">
        <el-dialog
        width="40%"
        title="请选择经纬度"
        :visible.sync="sameinnerVisible"
        append-to-body>
        <vue-amap @func="getLng" @closefunc="closeMap"></vue-amap>
        </el-dialog>
        <span class="blue">{{sameLevelForm.organName?'编辑':'新建'}}组织机构</span>
        <el-form @submit.native.prevent="save" label-position="right"  label-width="90px" :model="sameLevelForm" ref="sameLevelForm" :rules="rules">
            <el-form-item label="机构名称:" prop="organName">
                <el-input v-model="sameLevelForm.organName"></el-input>
            </el-form-item>
            <el-form-item label="机构描述:" prop="organDesc">
                <el-input v-model="sameLevelForm.organDesc"></el-input>
            </el-form-item>
            <el-form-item label="负责人:" prop="organPerson">
                <el-input v-model="sameLevelForm.organPerson"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone">
                <el-input v-model="sameLevelForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="上级机构:" prop="parent">
                <el-input v-model="sameLevelForm.parent"></el-input>
            </el-form-item>
            <el-form-item label="机构经度:" >
                <el-input v-model="sameLevelForm.latitude" disabled></el-input>
            </el-form-item>
            <el-form-item label="机构纬度:" >
                <el-input v-model="sameLevelForm.longitude" disabled></el-input>
            </el-form-item>
            <el-form-item label="地图定点:">
                <el-button type="success" icon="el-icon-map-location" @click="sameinnerVisible=true" class="choose-btn">选择经纬度</el-button>
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
    import VueAmap from '../components/VueAmap'
    export default {
        data() {
            return {
                sameDialogVisible: false,
                sameinnerVisible:true,
                sameLevelForm:{},
                rules:rules,
                organData:[],
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
                const res = await this.$http.get('/organ')
                this.organData = res.data
            },
            remove(row){
                this.$confirm(`是否确定删除机构${row.organName}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(async () => {
                        const res = await this.$http.delete(`/organ/${row._id}`)
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
                if(this.sameLevelForm._id){
                     const res = await this.$http.put(`/organ/${this.sameLevelForm._id}`,this.sameLevelForm)
                    if(res.data.success){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.fetch()
                    this.sameDialogVisible = false
                    }
                }else{
                    const res = await this.$http.post('/organ',this.sameLevelForm)
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
                const res = await this.$http.post('/organ/search',this.searchForm)
                this.organData = res.data
                this.searchForm={}
            },
            //地图插件方法
            getLng(data){
                this.sameLevelForm.latitude = data[0]
                this.sameLevelForm.longitude = data[1]
            },
            //关闭地图
            closeMap(data){
                this.sameinnerVisible = data
                this.subinnerVisible  = data
                this.configinnerVisible = data
            },
            //分页
            async changePage(){
                const res = await this.$http.get(`/organ/page?pageNo=${this.pageNo}&pageSize=${this.pageSize}`)
                this.organData = res.data
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
        components:{VueAmap}
    }
</script>

<style lang="scss" scoped>
    .box-card{
        width: 94vw;
    }
</style>