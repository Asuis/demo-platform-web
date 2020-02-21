<template>
    <div class="wapper">
            <el-form>
                <el-form :label-position="labelPosition" label-width="80px" :model="RepositoryInit">
                    <el-form-item label="项目名">
                        <el-row :gutter="0">
                            <el-col :span="6">
                            <el-select v-model="RepositoryInit.Prefix" clearable placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1" style="text-align:center;"> / </el-col>
                        <el-col :span="17">
                            <el-input v-model="RepositoryInit.Account"></el-input>
                        </el-col>
                        </el-row>
                        
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="RepositoryInit.Description"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公开">
    <el-switch v-model="RepositoryInit.IsPrivate"></el-switch>
  </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:100%" @click="onSubmit">创建</el-button>
                    </el-form-item>
                </el-form>
            </el-form>
    </div>
</template>

<script>
    export default {
        name: 'RepoForm',
        data() {
            return {
                RepositoryInit: {
                    Prefix: '',
                    Name: '',
                    Description: '',
                    IsPrivate: false,
                    UseCustomAvatar: false,
                    AvatarUrl: ''
                },
                options: []
            }
        },
        mounted() {
            this.options = [{
                value: this.user.name,
                label: this.user.name
            }]
            this.RepositoryInit.Prefix = this.user.name
        },
        computed: {
            user() {
                return this.$store.getters['user/getUser']
            }
        }
    }
</script>

<style scope>
    .wapper{
        padding: 12px;
    }
</style>