<template>
    <div>
        <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/#' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><router-link to="/admin/user">用户管理</router-link></el-breadcrumb-item>
                <el-breadcrumb-item><router-link to="">用户详情</router-link></el-breadcrumb-item>
            </el-breadcrumb>
        <el-card class="card" shadow="never">
            <div slot="header"  class="clearfix">
                <span>用户信息</span>
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
            </div>
            <div style="margin-top:20px;" v-for="(item, i) in info.u" :key="i">
                <span style="font-size:16px;font-weight:600;">{{i}}:</span>
                <span style="margin-left:20px;">{{item}}</span>
            </div>
            <div v-for="(item, i) in info.Ex" :key="i">
                <el-divider><span v-if="item.Type==='Student'">学生信息</span></el-divider>
                <span style="font-size:16px;font-weight:600;">学校:</span>
                <span style="margin-left:20px;">{{item.School}}</span>
            </div>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'UserDetails',
        data() {
            return {
                info: {
                    u: {
                        ID: '#080801',
                        LoginName: 'asuis',
                        Name: '*孟*',
                        Email: '727443530@qq.com',
                        Phone: '15988440××××',
                    },
                    Ex: [{
                        ID: 1,
                        Type: 'Student',
                        School: '杭州电子科技大学信息工程学院'
                    }]
                },
                arr: []
            }
        },
        mounted() {
            this.info = {
                u: {
                    ID: '#080801',
                    LoginName: 'asuis',
                    Name: '*孟*',
                    Email: '727443530@qq.com',
                    Phone: '15988440××××',
                },
                Ex: [{
                    ID: 1,
                    Type: 'Student',
                    School: '杭州电子科技大学信息工程学院'
                }]
            }
        },
        computed: {
            getInfoList: () => {
                var obj = this.info.u
                console.log(obj)
                var arr = []
                Object.getOwnPropertyNames(obj).forEach(function (key) {
                    arr.push({
                        name: key,
                        value: obj[key]
                    })
                    console.log(key, obj[key])

                })
                return arr
            }
        }
    }
</script>
<style scoped>
    .card {
    }
</style>