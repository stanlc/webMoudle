<template>
    <div>
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
        <!-- <el-dialog
        width="40%"
        title="请选择经纬度"
        :visible.sync="sameinnerVisible"
        append-to-body>
        <vue-amap @func="getLng" @closefunc="closeMap"></vue-amap>
        </el-dialog> -->
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
                <el-input v-model="sameLevelForm.latitude" ></el-input>
            </el-form-item>
            <el-form-item label="机构纬度:" >
                <el-input v-model="sameLevelForm.longitude" ></el-input>
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
    </div>
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
                organData:[],
                sameLevelForm:{},
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
        },
        components:{}
    }
</script>

<style lang="scss" scoped>

</style>