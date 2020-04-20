<template>
    <div>
            <div class="register-logo">

            </div>
        <div class="register-wapper">

            <div style="padding: 30px;" class="main">
                <div class="register-title">注册</div>
                <el-card class="register-card" shadow="nerver">
                    <el-form class="form" :label-position="labelPosition" label-width="80px" :model="RegisterForm">
                        <el-form-item label="邮箱/账户">
                            <el-input prefix-icon="el-icon-user" v-model="RegisterForm.Account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" prefix-icon="el-icon-lock" v-model="RegisterForm.Passwd">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input type="password" prefix-icon="el-icon-lock" v-model="RegisterForm.ConfirmPasswd">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="高校名称">
                            <el-input type="password" prefix-icon="el-icon-lock" v-model="RegisterForm.SchoolName">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input prefix-icon="el-icon-lock" v-model="RegisterForm.Email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-loading.fullscreen.lock="loading" type="primary" style="width:100%"
                                @click="onSubmit">
                                注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-divider></el-divider>
            </div>
        </div>
    </div>
</template>

<script>
    import {UserLogin} from '@/service/user'
    export default {
        name: 'RegisterView',
        data() {
            return {
                RegisterForm: {
                    Account: '',
                    Passwd: '',
                    ConfirmPasswd: '',
                    SchoolName: '',
                    GroupName: '',
                    Email: ''
                },
                Login: UserLogin
            }
        },
        methods: {
            onSubmit() {
                this.loading = true
                this.$store.dispatch('user/signIn', this.Login).then(() => {
                    this.loading = false
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style>
.register-logo{
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
    .register-wapper {
        width: 1280px;
        margin: 0 auto;
    }
    .register-card {
        margin: 0 auto;
        width: 500px;
    }
    .register-title {
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 20px;
    }
</style>