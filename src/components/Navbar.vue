<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

            <el-menu-item index="4">
                <router-link to="/home"></router-link>
            </el-menu-item>

            <el-submenu index="2" style="float:right;">
                <template slot="title">我的控制台</template>
                <el-menu-item index="2-1">我的项目</el-menu-item>
                <el-menu-item index="2-2">我的容器</el-menu-item>
                <el-menu-item index="2-3">展示</el-menu-item>
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
            
            <el-dialog class="dialog" title="创建项目" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                <repo-form></repo-form>
            </el-dialog>


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
        openRepoInit() {
            this.dialogVisible = true
        }
    },
    computed: {
            getUser() {
                return this.$store.getters['user/getUser']
            }
        },
        watch: {
            getUser(val) {
                this.user = val
                console.log('getuser', val)
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