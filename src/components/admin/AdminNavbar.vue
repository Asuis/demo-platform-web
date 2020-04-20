<template>
    <div>
        <div class="logo">
            <!-- <img src="http://res.mengxiangjing.com/logo.png" alt="logo"> -->
            <span>学科竞赛管理系统</span>
        </div>
        <el-menu :default-openeds="['1', '3']" :router="true">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>竞赛管理</template>
                <el-menu-item index="/admin/news">竞赛公告配置</el-menu-item>
                <el-menu-item index="/admin/process">竞赛过程配置</el-menu-item>
                <el-menu-item index="/admin/contest">竞赛管理</el-menu-item>
                <el-menu-item index="/admin/data">数据统计</el-menu-item>

            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>评审管理</template>
                <el-menu-item index="/admin/audit_conf">评审配置</el-menu-item>
                <el-menu-item index="/admin/audit">评审</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/repo"><i class="el-icon-menu"></i>项目管理</el-menu-item>
            <el-menu-item index="/admin/display"><i class="el-icon-menu"></i>项目展示</el-menu-item>

            <el-submenu index="4">
                <template slot="title"><i class="el-icon-message"></i>系统管理</template>
                <el-menu-item index="/admin/container">容器管理</el-menu-item>
                <el-menu-item index="/admin/sys">系统配置</el-menu-item>
            </el-submenu>
            <el-menu-item index="user"><i class="el-icon-user"></i>用户管理</el-menu-item>
        </el-menu>

    </div>
</template>

<script>
    export default {
        name: 'AdminNavbar',
        components: {},
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
                }],
                navData: [{
                }]
            }
        },
        methods: {
            handleSelect() {

            },
            handleClose() {},
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

    .logo {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo>img {
        height: 60px;
    }
</style>