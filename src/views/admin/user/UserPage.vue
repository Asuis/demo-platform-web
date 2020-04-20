<template>
    <div class="container">
        <div>
            <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/#' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><router-link to="">用户管理</router-link></el-breadcrumb-item>
            </el-breadcrumb>
            <div>
                <el-input></el-input>
            </div>
            <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column label="ID" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.ID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称" width="180">
                <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium" @click="goDetails(scope.row.ID)">{{ scope.row.Name }}</el-tag>
                        </div>
                </template>
            </el-table-column>

            <el-table-column label="邮箱" width="180">
                <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Email }}</el-tag>
                        </div>
                </template>
            </el-table-column>

            <el-table-column label="角色" width="180">
                <template slot-scope="scope">
                    
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
                             <el-tag size="medium">管理员</el-tag>
                             <el-tag size="medium">学生</el-tag>
                        </div>

                </template>
            </el-table-column>

            <el-table-column label="上次登录" width="180">
                <template>
                            <div size="medium">2020-4-20</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top:20px;" background layout="prev, pager, next" :total="total">
        </el-pagination>
        </div>
        
        
    </div>
</template>

<script>
    export default {
        name: 'UserPage',
        data() {
            return {
                total: 1,
                tableData: [{
                    ID: '1',
                    Name: 'Asuis',
                    Email: '727443530@qq.com',
                    Avatar: '1.png',
                    Roles: ['user'],
                    UserExtra: {}
                }, ]
            }
        },
        mounted() {
            this.loadUserData()
        },
        methods: {
            loadUserData() {
                this.$store.dispatch('admin/listUser', {
                    page: 0,
                    pageSize: 10,
                    order: 'Id'
                }).then(({
                    data
                }) => {
                    this.tableData = data.Data
                    this.total = data.Total
                })
            },
            loadUserInfo() {},
            handleEdit() {},
            handleDelete() {},
            goDetails(ID) {
                this.$router.push(`/admin/user/details/${ID}`)
            }
        }
    }
</script>
<style scoped>
    .container {
        text-align: center;
        max-width: 1280px;
    }

    .table {
        min-height: 300px;
    }
</style>