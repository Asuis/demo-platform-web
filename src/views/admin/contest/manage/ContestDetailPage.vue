<template>
  <div>
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/#' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="">竞赛信息管理</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="">竞赛信息详情</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="container5" type="flex" :gutter="20">
      <el-col class="item" :span="24" v-for="i in 1" :key="i">
        <el-tabs v-model="activeName">
          <el-tab-pane label="公告" name="first">
            <div v-html="news.Content"></div>
            <el-button type="primary" style="float:right;" @click="dialogVisible2 = true">报名</el-button>
          </el-tab-pane>
          <el-tab-pane label="选题管理" name="second">
            <QuestionList></QuestionList>
          </el-tab-pane>
          <el-tab-pane label="报名团队管理" name="third">
            <GroupList></GroupList>
          </el-tab-pane>
          <el-tab-pane label="评审管理" name="fourth">
            <AuditList></AuditList>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>


    <el-dialog :title="`${contest.Title}报名`" :visible.sync="dialogVisible2" width="40%">
      <el-form>
        <h1>{{contest.Name}}</h1>
        <el-form-item label="队伍">
          <el-select :remote="true" :remote-method="searchGroup" v-model="signUpForm.groupID" placeholder="请选择">
            <el-option v-for="item in groupOptions" :key="item.ID" :label="item.Name" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button style="float:right;" type="primary" @click="handleSignUp">确认报名</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import moment from 'moment'
  import QuestionList from '@/components/contest/QuestionList'
  import GroupList from '@/components/contest/GroupList'
  import AuditList from '@/components/contest/AuditList'
  export default {
    name: 'ContestDetailPage',
    components: {
      QuestionList,
      GroupList,
      AuditList
    },
    data() {
      return {
        activeName: 'first',
        total: 1,
        dialogVisible: false,
        dialogVisible2: false,
        roleOptions: [],
        news: {
          Title: '',
          Content: ''
        },
        contestForm: {
          Title: '',
          Description: '',
          Ex: '',
          Logo: '',
          StartTime: '',
          EndTime: '',
          NewsID: 0,
          ProcessID: 0,
          Status: 0,
          Top: false,
          Register: false
        },
        contestUpdForm: {},
        list: [],
        searchForm: {
          status: '',
          search: ''
        },
        newsSearch: '',
        processOptions: [],
        newsOptions: [],
        contest: {},
        signUpForm: {
          groupID : ''
        },
        groupOptions: []
      }
    },
    mounted() {
      // this.searchContest()
      // this.searchNews('')
      // this.searchProcess('')
      this.getContest()
      this.searchGroup('')
    },
    methods: {
      dateformat(time) {
        return moment(time).format('MM-DD')
      },
      onSubmit() {
        this.$store.dispatch('contest/create', this.contestForm)
          .then(({
            data
          }) => {
            console.log(data)
            this.$message({
              type: 'success'
            })
          })
      },
      handleClose() {
        this.dialogVisible = false

      },
      handleOpen() {
        this.dialogVisible = true
      },
      searchNews(q) {
        this.$store.dispatch('news/list', {
          order: 'ID',
          pageSize: 100,
          page: 0,
          Title: q
        }).then(({
          data
        }) => {
          console.log(data)
          this.newsOptions = data.Data
          // this.total = data.Total
        })
      },
      searchGroup(q) {
        console.log('searchgroup')
        this.$store.dispatch('group/mylist', {
          order: 'ID',
          pageSize: 100,
          page: 0,
          Title: q
        }).then(({
          data
        }) => {
          console.log(data)
          this.groupOptions = data.Data
          
          // this.total = data.Total
        })
      },
      searchProcess(q) {
        console.log(q)
        this.$store.dispatch('process/list', {
          order: 'UpdatedUnix',
          pageSize: 100,
          page: 0,
          Title: q
        }).then(({
          data
        }) => {
          console.log(data)
          this.processOptions = data.Data
        })
      },
      searchContest() {
        this.$store.dispatch('contest/list', {
          order: 'UpdatedUnix',
          pageSize: 100,
          page: 0,
          Title: ''
        }).then(({
          data
        }) => {
          console.log(data)
          this.list = data.Data
          this.total = data.Total
        })
      },
      updContest(e) {
        this.$store.dispatch('contest/update', {
          ID: e.ID,
          Register: true
        }).then(() => {
          this.$message({
            type: 'success',
            content: '发布成功'
          })
        })
      },
      getNews() {
        console.log(['getNews'])
        if (this.contest.NewsID !== 0) {
          this.$store.dispatch('news/get', {
            id: this.contest.NewsID
          }).then(({
            data
          }) => {
            console.log('getnews',data)
            this.news.Title = data.Title
            this.news.Content = data.Content
          })
        }

      },
      getContest() {
        console.log('contest')
        this.$store.dispatch('contest/get', {
          id: this.$route.params.id
        }).then(({
          data
        }) => {
          console.log(data)
          this.contest = data
          
          // this.total = data.Total
        }).then(()=> {
          console.log('getnews')
          this.getNews()
        })
      },
      handleSignUp() {
        this.$store.dispatch('contest/signUp', {contestID: this.contest.ID,...this.signUpForm})
          .then(({
            data
          }) => {
            console.log(data)
            this.$message({
              type: 'success'
            })
          })
      }
    }
  }
</script>

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