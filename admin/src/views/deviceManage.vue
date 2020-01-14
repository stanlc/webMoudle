<template>
    <el-card class="box-card">
    <div>
        <h1>{{id?'编辑':'新增'}}设备</h1>
        <el-form @submit.native.prevent="save" :inline="true">
            <el-form-item label="设备名称" label-width="80px">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="设备别名" label-width="80px">
                <el-input v-model="model.nickName"></el-input>
            </el-form-item>
            <el-form-item label="设备状态" label-width="80px">
                <el-input v-model="model.status"></el-input>
            </el-form-item>
            <el-form-item label="序列mac" label-width="80px">
                <el-input v-model="model.mac"></el-input>
            </el-form-item>
            <el-form-item label="所属机构" label-width="80px">
                <el-input v-model="model.organ"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" label-width="80px">
                <el-input v-model="model.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
    </el-card>
</template>

<script>
    export default {
        props:{
            id:{}
        },
        data() {
            return {
                model: {}
            }
        },
        created(){
            this.id && this.fetch()
        },
        methods: {
            async save() {
                let res
                if(this.id){
                    res = await this.$http.put(`/device/${this.id}`,this.model)
                }else{
                    res = await this.$http.post('/device',this.model)
                }
                if(res.data.success){
                   this.$message({
                       type:'success',
                       message:'保存成功'
                   })
                this.$router.push('/deviceList')
               }
            },
            async fetch(){
                const res = await this.$http.get(`/device/${this.id}`)
                this.model = res.data
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>