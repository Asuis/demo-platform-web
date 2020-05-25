<template>
  <div class="container3">
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">个人信息</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="container5" type="flex" :gutter="20">
      <el-col class="item" :span="24" v-for="i in 1" :key="i">
        <el-card>
          <el-steps :active="2" align-center>
  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
</el-steps>
        <div>
          上传
        </div>
        <div>完善信息</div>
        <div>选题</div>
        <div>评审</div>
        <div>结果</div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'MyContestDetailsView',
    components: {},
    data() {
      return {
        
      }
    },
    mounted() {
      this.listContainer()
    },
    methods: {
      details() {
        this.$store.dispatch('contest/get')
      },
      upload() {
        this.$store.dispatch('user/bindStu')
      },
      submitForm() {
        this.$store.dispatch('user/bindTeach')
      },
      audit() {
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