<template>
  <div class="container3">
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">个人信息</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="container5" type="flex" :gutter="20">
      <el-col class="item" :span="24" v-for="i in 1" :key="i">
        <el-tabs v-model="activeName">
          <el-tab-pane label="个人信息" name="first">
            <el-card>

              <div>
                <div>
                  <span>登录名：</span>
                  <span></span>
                </div>
                <div>
                  <span>邮箱名：</span>
                  <span></span>
                </div>
                <div>
                  <span>昵称：</span>
                  <span></span>
                </div>

              </div>

              <div>
                <el-form>
                  <el-form-item></el-form-item>
                  <el-form-item></el-form-item>
                  <el-form-item></el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="学生认证" name="second">
            <el-card>

              <div>
                <div>
                  <span>登录名：</span>
                  <span></span>
                </div>
                <div>
                  <span>邮箱名：</span>
                  <span></span>
                </div>
                <div>
                  <span>昵称：</span>
                  <span></span>
                </div>

              </div>


              <div>
                <el-form>
                  <el-form-item></el-form-item>
                  <el-form-item></el-form-item>
                  <el-form-item></el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="教师认证" name="third">
            <el-card>

              <div>
                <div>
                  <span>登录名：</span>
                  <span></span>
                </div>
                <div>
                  <span>邮箱名：</span>
                  <span></span>
                </div>
                <div>
                  <span>昵称：</span>
                  <span></span>
                </div>

              </div>


              <div>
                <el-form>
                  <el-form-item></el-form-item>
                  <el-form-item></el-form-item>
                  <el-form-item></el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'MyDetailsView',
    components: {},
    data() {
      return {
        list: [],
        payload: {
          pageSize: 10,
          page: 0,
          order: 'ID'
        },
        containerForm: {
          Name: '',
          Desc: '',
          ImageID: 0,
          ImageName: '',
          ImageSha1: '',
          Cpu: 1,
          Mem: 1
        },
        imageOptions: [{
          label: 'centos',
          value: 1
        }],
        cpuOptions: [{
          label: '1',
          value: 1
        }],
        memOptions: [{
          label: '1G',
          value: 1
        }],
        total: 2,
        dialogVisible2: false,
        searchForm: {}
      }
    },
    mounted() {
      this.listContainer()
    },
    methods: {
      details() {
        this.$store.dispatch('user/details')
      },
      bindStu() {
        this.$store.dispatch('user/bindStu')
      },
      bindTeach() {
        this.$store.dispatch('user/bindTeach')
      },
      bindUser() {
        this.$store.dispatch('user/bindUser')
      },
    },
  }
</script>
<style scoped>
  .container3 {
    max-width: 1280px;

    margin: 10px auto;
  }
</style>

<style scoped>
  .container5 {
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