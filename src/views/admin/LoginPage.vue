<template>
    <div class="home_container">
            <login-view class="login-view"></login-view>
    </div>
</template>

<script>
  import LoginView from '@/components/user/LoginView.vue'
    export default {
        name: "LoginPage",
        components: {
            LoginView
        },
        data() {

        },

    }
</script>
<style scoped>
    .home_container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: url('http://res.mengxiangjing.com/48401001_p0.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 65px;
        width: 100%;
        height: 100vh;
        padding: 0;
        margin: 0;
    }
    /* .home_container:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
} */
    .login-view{
        position: relative;
        z-index: 999;
        width: 460px;
    }
</style>