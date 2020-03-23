<template>
    <div class="container">
        <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column label="ID" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.Id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.Name }}</p>
                        <p>住址: {{ scope.row.Email }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="学校" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.Name }}</p>
                        <p>住址: {{ scope.row.Email }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.Name }}</p>
                        <p>住址: {{ scope.row.Email }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="角色" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.Name }}</p>
                        <p>住址: {{ scope.row.Email }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="上次登录" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.Name }}</p>
                        <p>住址: {{ scope.row.Email }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'UserPage',
        data() {
            return {
                total: 1,
                tableData: [{
                    Id: '1',
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
            handleDelete() {}
        }
    }
</script>
<style scoped>
    .container {
        text-align: center;
        max-width: 1000px;
    }

    .table {
        min-height: 300px;
    }
</style>