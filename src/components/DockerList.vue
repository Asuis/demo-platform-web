<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>我的容器</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">创建容器
                </el-button>
            </div>
            <el-row v-for="item in list" :key="item.ID">
                <el-col :span="6">
                    <docker-item :ID="item.ID" :Name="item.Name" :ContainerID="item.ContainerID"
                        :Status="getStatus(item.Status)"></docker-item>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog class="dialog" title="创建容器" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <docker-form></docker-form>
        </el-dialog>
    </div>
</template>

<script>
    import DockerItem from '@/components/DockerItem.vue'
    import DockerForm from '@/components/DockerForm.vue'
    export default {
        name: 'DockerList',
        components: {
            DockerItem,
            DockerForm
        },
        props: {},
        data() {
            return {
                payload: {
                    pageSize: 10,
                    page: 0,
                    order: 'ID'
                },
                dialogVisible: false,
                list: []
            }
        },
        mounted() {
            this.init(this.payload)
        },
        methods: {
            init(payload) {
                this.$store.dispatch('container/list', payload)
            },
            getRepoUrl(item) {
                return `/repo/${item.Name}`
            },
            getStatus(key) {
                if (key === 4) {
                    return "创建成功"
                }
            },
            handleClose() {}
        },
        computed: {
            getList() {
                return this.$store.getters['container/List']
            },
        },
        watch: {
            getList(val) {
                this.list = val
                console.log('get container list', val)
            }
        }
    }
</script>

<style>
    .create-container-btn {
        float: right;
        margin-right: 20px;
    }
</style>