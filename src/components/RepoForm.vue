<template>
    <div class="wapper">
            <el-form>
                <el-form :label-position="labelPosition" label-width="80px" :model="RepositoryInit">
                    <el-form-item label="项目名">
                        <el-row :gutter="0">
                            <el-col :span="6">
                            <el-select v-model="RepositoryInit.prefix" clearable placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1" style="text-align:center;"> / </el-col>
                        <el-col :span="17">
                            <el-input v-model="RepositoryInit.name"></el-input>
                        </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="RepositoryInit.description"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公开">
    <el-switch v-model="RepositoryInit.isPrivate"></el-switch>
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
                    prefix: '',
                    name: '',
                    description: '',
                    isPrivate: false,
                    useCustomAvatar: false,
                    avatarUrl: ''
                },
                options: []
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('repo/create',  {
                    prefix: this.RepositoryInit.prefix,
                    name: this.RepositoryInit.prefix + '/'+this.RepositoryInit.name,
                    description: this.RepositoryInit.description,
                    isPrivate: this.RepositoryInit.isPrivate,
                    useCustomAvatar: this.RepositoryInit.useCustomAvatar,
                    avatarUrl: this.RepositoryInit.avatarUrl
                }).then((data)=>{
                    console.log(data)
                    this.$router.push(`/repo/${ this.RepositoryInit.prefix}/${this.RepositoryInit.name}/`)
                })
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