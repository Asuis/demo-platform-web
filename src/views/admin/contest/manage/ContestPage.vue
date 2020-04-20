<template>
    <div>
        <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/#' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><router-link to="">竞赛信息管理</router-link></el-breadcrumb-item>
            </el-breadcrumb>
        <div class="search-container">
            <el-select placeholder="状态" v-model="searchForm.status" class="select">
                <el-option label="进行中" value="1"></el-option>
                        <el-option label="已结束" value="beijing"></el-option>
                        <el-option label="未发布" value="beijing"></el-option>
            </el-select>
            <el-input prefix-icon="el-icon-search" class="search" v-model="searchForm.search"></el-input>
            <el-button type="primary" class="search-btn" @click="handleOpen" icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="create-btn" @click="handleOpen">创建</el-button>
        </div>
        <el-row class="container" type="flex" :gutter="20">
            <el-col class="item" :span="6" v-for="i in 10" :key="i">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="http://res.mengxiangjing.com/ChobeChick_ZH-CN9997116812.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>第2000届xx泵竞赛</span>
                        <div class="bottom clearfix">
                            <time class="time">时间：2019.10.20-2019.12.30</time>
                            
                            <el-button type="text" class="button">详情</el-button>
                            <el-button class="button"  type="text" icon="el-icon-edit">编辑</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination style="text-align:center;margin-top:20px;" background layout="prev, pager, next" :total="total">
        </el-pagination>

        <el-dialog title="竞赛创建" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <el-form>
                <el-form-item label="竞赛名称" required>
                    <el-input v-model="formInline.Name" placeholder="竞赛名称"></el-input>
                </el-form-item>
                <el-form-item label="竞赛描述">
                    <el-input v-model="formInline.Desc" type="textarea" placeholder="竞赛名称"></el-input>
                </el-form-item>
                <el-form-item label="报名开始时间" required>
                            <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                                style="width: 100%;"></el-date-picker>
                        
                </el-form-item>
                <el-form-item label="报名结束时间" required>
                            <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                                style="width: 100%;"></el-date-picker>
                        </el-form-item>
                <el-form-item label="流程" required>
                    <el-select v-model="formInline.value" placeholder="选择流程">
                        <el-option label="传统流程" value="1"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公告关联" required>
                    <el-select v-model="formInline.value" placeholder="选择公告">
                        <el-option label="传统流程" value="1"></el-option>
                        <el-option label="流程2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>


</template>

<script>
    export default {
        name: 'ContestPage',
        data() {
            return {
                total: 100,
                dialogVisible: false,
                formInline: {
                    Name: '',
                    Desc: '',
                    date1: '',
                    date2: '',
                    value: '1'
                },
                searchForm: {
                    status: '',
                    search: ''
                }
            }
        },
        methods: {
            onSubmit() {

            },
            handleClose() {
                this.dialogVisible = false

            },
            handleOpen() {
                this.dialogVisible = true
            }
        }
    }
</script>

<style scoped>
    .container {
        flex-wrap: wrap;
    }

    .item {
        flex-shrink: 0;
    }

    .search-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 18px;
    }

    .image {
        height: 200px;
    }

    .select {}

    .search {
        margin-left: 20px;
        margin-right: 20px;
        width: 200px;
    }

    .create-btn {
        margin-left: 18px;
    }

    .button {
        float: right;
        margin-top: 20px;
        margin-left: 8px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
</style>