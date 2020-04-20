<template>
    <div>
        <div class="index-logo">
        </div>
        <div class="index-wapperw">

            <el-row class="index-wapper" :gutter="0">
                <el-col :span="13" :offset="2">
                    <NewsList></NewsList>
                </el-col>
                <el-col :span="8" :offset="1">
                    <LoginView></LoginView>
                </el-col>

            </el-row>
            <el-divider>项目展示</el-divider>
            <el-row style="margin-bottom:12px;">
                <el-col :span="4" v-for="i in 4" :key="i" :offset="2">
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                            class="image">
                        <div style="padding: 14px;">
                            <span>好吃的汉堡</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ currentDate }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
    import NewsList from '@/components/news/NewsList.vue'
    import LoginView from '@/components/user/LoginView.vue'
    export default {
        name: 'IndexView',
        components: {
            NewsList,
            LoginView
        },
        data() {
            return {
                slidelist: [{
                        ID: '',
                        Logo: '',
                        Type: '',
                        Title: ''
                    },
                    {
                        ID: '',
                        Logo: '',
                        Type: '',
                        Title: ''
                    },
                    {
                        ID: '',
                        Logo: '',
                        Type: '',
                        Title: ''
                    }
                ],

            }
        }
    }
</script>

<style scoped>
    .index-logo {
        vertical-align: middle;
        background: #fff;
        background: url('http://res.mengxiangjing.com/JP9vy23Vm2.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 65px;
        max-width: 100%;
        /* max-height: 100%; */
        height: 200px;

    }

    .index-wapperw {
        max-width: 1280px;
        margin: 0 auto;
    }

    .index-wapper {
        margin: 0 auto;
        margin-top: 10px;
    }

    .index-list {}

    .image{
        height: 220px;
    }
</style>