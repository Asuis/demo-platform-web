<template>
    <el-card class="repo-view" :body-style="{ padding: '0px' }">
        <div class="repo-container">
            <div class="name-view">
                <el-avatar src="http://res.mengxiangjing.com/preview.jpg"></el-avatar>
                <span>{{info.Name}}</span>
            </div>
        </div>
        <div class="container">

            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">

                <el-input class="container-search" v-model="input" placeholder="查找"></el-input>

                    <el-table :data="tableData" style="width: 100%, margin-bottom:10px">
                        <el-table-column prop="date" label="文件名" width="180">
                         <template slot-scope="scope">
        <i class="el-icon-folder"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
                        </el-table-column>
                        <el-table-column prop="name" label="" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="更新时间">
                        </el-table-column>
                    </el-table>

                    <el-card shadow="never">
                        <div slot="header">
                            Readme.md
                        </div>
                        <div class="text item">
                            {{'列表内容' }}
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </div>
        <div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'RepoView',
        data() {
            return {
                username: '',
                repo: '',
                relpath: '',
                info: {},
                input: '',
                activeName: 'first',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        mounted() {
            this.username = this.$route.params.username
            this.repo = this.$route.params.repo
            // this.relpath = this.$route.params.relpath
            this.init()

        },
        methods: {
            init() {
                const payload = {
                    username: this.username,
                    repo: this.repo
                }
                this.$store.dispatch('repo/info', payload)
                this.$store.dispatch('repo/files', {
                    username: this.username,
                    repo: this.repo,
                    relpath: this.relpath
                })
            }
        },
        computed: {
            getInfo() {
                return this.$store.getters['repo/infoRepo']
            }
        },
        watch: {
            getInfo(val) {
                console.log(val)
                this.info = val
            }
        }
    }
</script>

<style scope>
    .container-search {
        max-width: 200px;
        margin-right: 8px;
        float: right;
    }
    .container-search::after{
        clear: both;
    }

    .container {
        padding: 20px;
    }

    .container>div {
        margin-bottom: 8px;
    }

    .repo-view {
        display: flex;
        flex-direction: column;
        max-width: 1024px;
        margin: auto;
    }

    .repo-view>div {
        margin-bottom: 8px;
    }

    .repo-container {
        display: flex;
        flex-direction: column-reverse;
        background: url('http://res.mengxiangjing.com/preview.jpg');
        background-position: center;
        background-repeat: no-repeat;
        height: 30vh;
        margin-bottom: 8px;


    }

    .name-view {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .name-view>el-avatar,
    span {
        margin: 16px;
        color: white;
        font-size: 20px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {}
</style>