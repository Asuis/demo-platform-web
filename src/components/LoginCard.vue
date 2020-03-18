<template>
  <div class="home_container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="viewer">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <repo-list></repo-list>
        </div>
      </el-col>
      <el-col :span="8">
        <login-view></login-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RepoList from '@/components/RepoList.vue'
  import LoginView from '@/components/user/LoginView.vue'
  export default {
    name: "Login",
    components: {
      RepoList,
      LoginView
    },
    data() {
      return {
        currentDate: new Date(),
        Login: {
          Account: 'asuis',
          Passwd: 'Demo127117',
        },
        loading: false
      }
    },
    mounted() {
    },
    methods: {
      onSubmit(e) {
        console.log(`submit :`, e)
        this.loading = true
        this.$store.dispatch('user/signIn', this.Login)
      }
    }
  }
</script>


<style scoped>
  .home_container {
    vertical-align: middle;
    background: #000;
    background: url('http://res.mengxiangjing.com/preview.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 65px;
    max-width: 100%;
    max-height: 100%;
  }


  .viewer {
    background: #fff;
  }


  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>