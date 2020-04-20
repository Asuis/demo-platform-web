<template>
    <div>
        <div class="contestlist-logo">
        </div>
        <div class="contestlist-wapper">
            <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><router-link to='/list/news'>竞赛</router-link></el-breadcrumb-item>
            </el-breadcrumb>
            <el-row class="container" type="flex" :gutter="20">
            <el-col class="item" :span="6" v-for="i in 10" :key="i">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="http://res.mengxiangjing.com/ChobeChick_ZH-CN9997116812.jpg" class="image">
                    <div style="padding: 14px;">
                        <span>第2000届xx泵竞赛</span>
                        <div class="bottom clearfix">
                            <time class="time">时间：2019.10.20-2019.12.30</time>
                            <div>
                            <el-button class="button"  type="text" icon="el-icon-edit">报名</el-button>
                                <el-button type="text" class="button">详情</el-button>
                            </div>
                            
                        </div>
                    </div>
                    
                </el-card>
            </el-col>
        </el-row>
                <el-pagination style="text-align:center;margin-top:20px;" background layout="prev, pager, next" :total="1">
        </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ContestListView'
    }
</script>

<style scoped>

    .contestlist-wapper {
        width: 1280px;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .contestlist-logo {
        vertical-align: middle;
        background: #fff;
        background: url('http://res.mengxiangjing.com/banong4.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 65px;
        max-width: 100%;
        /* max-height: 100%; */
        height: 200px;
    }
    .container {
        flex-wrap: wrap;
    }

    .item {
        flex-shrink: 0;
    }
    .button {
        float: right;
        margin-top: 20px;
        margin-left: 8px;
    }
    .image {
        height: 200px;
    }
</style>