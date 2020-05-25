<template>
    <div>
        <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
            @select="handleSelect">

            <el-menu-item index="4">
                <router-link to="/home">学科竞赛管理平台</router-link>
            </el-menu-item>



                <el-menu-item index="/index">首页</el-menu-item>
                <el-menu-item index="/list/news">公告</el-menu-item>
                <el-menu-item index="/list/contest">竞赛</el-menu-item>
                <el-menu-item index="/list/repo">项目</el-menu-item>

            <div v-if="isLogin">
                <el-submenu index="2" style="float:right;">
                    <template slot="title">我的控制台</template>
                    <el-menu-item index="/myrepository">我的项目</el-menu-item>
                    <el-menu-item index="/mycontainer">我的容器</el-menu-item>
                    <el-menu-item index="2-3">预览项目</el-menu-item>
                    <el-menu-item index="2-4">我的比赛</el-menu-item>
                    <el-menu-item index="/mygroup">我的团队</el-menu-item>
                    <el-menu-item index="2-6">退出</el-menu-item>

                </el-submenu>
                <div class="user-view">
                    <el-popover placement="bottom" width="360" trigger="click">
                        <el-table :data="gridData">
                            <el-table-column width="150" property="date" label="日期"></el-table-column>
                            <el-table-column width="100" property="name" label="姓名"></el-table-column>
                            <el-table-column width="300" property="address" label="地址"></el-table-column>
                        </el-table>
                        <div slot="reference" class="user-view">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                            </el-avatar>
                            <span>{{getUser.name}}</span>
                        </div>
                    </el-popover>
                    <el-button type="primary" class="repo-create" @click="openRepoInit">创建</el-button>
                </div>

                <el-dialog class="dialog" title="创建项目" :visible.sync="dialogVisible" width="50%"
                    :before-close="handleClose">
                    <repo-form></repo-form>
                </el-dialog>
            </div>




        </el-menu>
    </div>
</template>

<script>
    import RepoForm from '@/components/RepoForm.vue'
    export default {
        name: 'Navbar',
        components: {
            RepoForm
        },
        data() {
            return {
                dialogVisible: false,
                activeIndex: '1',
                user: {},
                isAdmin: false,
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            }
        },
        methods: {
            handleSelect() {

            },
            handleClose() {
              this.dialogVisible = false
            },
            openRepoInit() {
                this.dialogVisible = true
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['user/getUser']
            },
            IsAdmin() {
                return this.$store.getters['user/getUser']
            },
            isLogin() {
              return this.$store.getters['user/isLogin']
            }
        },
        watch: {
            getUser(val) {
                this.user = val
                console.log('getuser', val)
            },
            IsAdmin(val) {
                this.IsAdmin = val
                console.log('isAdmin', val)
            }
        }
    }
</script>

<style scope>
    .user-view {
        float: right;
        height: 60px;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        display: flex;
        cursor: pointer;
    }

    .user-view::after {
        clear: both;
    }


    .user-view>span {
        margin-right: 10px;
    }

    .repo-create {
        float: right;
    }
</style>