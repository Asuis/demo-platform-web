<template>
    <el-card :body-style="{ padding: '0px' }" class="login_view card">
        <img :src="`http://res.mengxiangjing.com/AbstractSaltBeds_ZH-CN8351691359.jpg`" class="image">
        <div style="padding: 30px;" class="main">
                <el-form  class="form" :label-position="labelPosition" label-width="80px" :model="Login">
                    <el-form-item label="邮箱/账户">
                        <el-input prefix-icon="el-icon-user" v-model="Login.Account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" prefix-icon="el-icon-lock" v-model="Login.Passwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-loading.fullscreen.lock="loading" type="primary" style="width:100%"
                            @click="onSubmit">登录</el-button>
                    </el-form-item>
            </el-form>
            <div style="margin:0;padding:0;">
                <el-button type="text" @click="toRegister">注册</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
    import {UserLogin} from '@/service/user'
    export default {
        name: 'LoginView',
        data() {
            return {
                Login: UserLogin,
                loading: false,
                publicPath: process.env.BASE_URL
            }
        },
        mounted() {
            console.log(this.Login)
        },
        methods: {
            
            onSubmit(e) {
                console.log(`submit :`, e)
                this.loading = true
                this.$store.dispatch('user/signIn', this.Login).then(() => {
                    this.loading = false

                    // this.$router.push('/admin/#')
                }).catch(()=>{
                    this.loading = false
                })
            },
            toRegister() {
                this.$router.push('/register')
            },
    }
}
</script>

<style scoped>
    .image {
        height: 260px;
        z-index: 999;
    }

    .card {
        background-color: rgba(0, 0, 0, 0);
        border: 0;
    }

    .main {
        position: relative;
        z-index: 0;
    }

    .form {
        z-index: 999;
    }

    .form::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: inherit;
        filter: blur(2px);
        z-index: -1;
        background-color: rgba(255, 255, 255, 0.9);
    }
</style>>