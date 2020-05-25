<template>
  <div class="container3">
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">我的团队</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-container">
      <!-- <el-select placeholder="状态" v-model="searchForm.status" class="select">
        <el-option label="进行中" value="1"></el-option>
        <el-option label="已结束" value="beijing"></el-option>
        <el-option label="未发布" value="beijing"></el-option>
      </el-select> -->
      <el-input prefix-icon="el-icon-search" class="search" v-model="searchForm.search"></el-input>
      <el-button type="primary" class="search-btn" @click="handleOpen" icon="el-icon-search">查询</el-button>
      <el-button type="primary" class="create-btn" @click="dialogVisible = true">创建</el-button>
    </div>
    <el-row class="container5" type="flex" :gutter="20">
      <el-col class="item" :span="6" v-for="i in list" :key="i.ID">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://res.mengxiangjing.com/ChobeChick_ZH-CN9997116812.jpg" class="image">
          <div style="padding: 14px;">
            <span>
            <router-link :to="'/group/'+i.ID">{{i.Name}}</router-link>
            </span>
            <div class="bottom clearfix">
              <div style="margin-bottom:12px;">{{i.Description}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
    </el-row>
    <el-pagination style="text-align:center;margin-top:20px;" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="payload.page" :page-size="payload.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="团队创建" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form>
        <el-form-item label="团队名称" required>
          <el-input v-model="groupForm.Name" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="团队描述">
          <el-input v-model="groupForm.Description" type="textarea" placeholder="描述"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button style="float:right;" type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'MyGroupView',
    components: {},
    data() {
      return {
        list: [],
        searchForm: {},
        dialogVisible: false,
        groupForm: {
          Name: '',
          Description: '',
          UserID: 0
        },
        payload: {
          pageSize: 10,
          page: 0,
          order: 'ID'
        },
        total: 1
      }
    },
    mounted() {
      this.init(this.payload)
    },
    methods: {
      init(payload) {
        this.$store.dispatch('group/mylist', payload).then(({data})=> {
          console.log(data)
          this.list = data.Data
          this.total = data.Total
        })
      },
      onSubmit() {
        this.$store.dispatch('group/create', this.groupForm).then(()=> {
          this.$message({
            type: 'success',
            message: '创建团队成功'
          })
        })
      },
      groupList() {
        this.$store.dispatch('group/list', {
          order: 'ID',
          pageSize: 100,
          page: 0,
          name: ''
        }).then(({
          data
        }) => {
          console.log(data)
          this.tableData = data.Data
          this.total = data.Total
        })
      },
    },
    computed: {
      getList() {
        return this.$store.getters['repo/listRepositories']
      },
    },
    watch: {
      getList(val) {
        this.list = val
        console.log('getRepoList', val)
      }
    }
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