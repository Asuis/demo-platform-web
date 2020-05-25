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
    <div class="search-container">
      <el-select placeholder="状态" v-model="searchForm.status" class="select">
        <el-option label="进行中" value="1"></el-option>
        <el-option label="已结束" value="beijing"></el-option>
        <el-option label="未发布" value="beijing"></el-option>
      </el-select>
      <el-input prefix-icon="el-icon-search" class="search" v-model="searchForm.search"></el-input>
      <el-button type="primary" class="search-btn" @click="handleOpen" icon="el-icon-search">查询</el-button>
      <el-button type="primary" class="create-btn" @click="handleOpen">创建</el-button>
    </div>
    <el-row class="container5" type="flex" :gutter="20">
      <el-col class="item" :span="6" v-for="i in list" :key="i.ID">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://res.mengxiangjing.com/ChobeChick_ZH-CN9997116812.jpg" class="image">
          <div style="padding: 14px;">
            <span>{{i.Title}}</span>
            
            <div class="bottom clearfix">
              <div style="margin-bottom:12px;">时间：{{dateformat(i.StartTime)}}-{{dateformat(i.EndTime)}}</div>
            <el-switch v-model="i.Register" active-text="已发布" inactive-text="未发布">
            </el-switch>  
              <div>
                <el-button @click="toDetails(i.ID)" type="text" class="button">详情</el-button>
                <el-button class="button" type="text" icon="el-icon-edit">编辑</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination style="text-align:center;margin-top:20px;" background layout="prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="竞赛创建" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form>
        <el-form-item label="竞赛名称" required>
          <el-input v-model="contestForm.Title" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="竞赛描述">
          <el-input v-model="contestForm.Description" type="textarea" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="报名开始时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="contestForm.StartTime" style="width: 100%;">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="报名结束时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="contestForm.EndTime" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="流程" required>
          <el-select filterable remote :remote-method="searchProcess" v-model="contestForm.ProcessID"
            placeholder="选择流程">
            <el-option v-for="item in processOptions" :key="item.ID" :label="item.Name" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告关联" required>
          <el-select filterable remote :remote-method="searchNews" v-model="contestForm.NewsID" placeholder="选择公告">
            <el-option v-for="item in newsOptions" :key="item.ID" :label="item.Title" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="竞赛" :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
      <el-form>
        <el-form-item label="竞赛名称" required>
          <el-input v-model="contestForm.Title" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="竞赛描述">
          <el-input v-model="contestForm.Description" type="textarea" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="报名开始时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="contestForm.StartTime" style="width: 100%;">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="报名结束时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="contestForm.EndTime" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="流程" required>
          <el-select filterable remote :remote-method="searchProcess" v-model="contestForm.ProcessID"
            placeholder="选择流程">
            <el-option v-for="item in processOptions" :key="item.ID" :label="item.Name" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告关联" required>
          <el-select filterable remote :remote-method="searchNews" v-model="contestForm.NewsID" placeholder="选择公告">
            <el-option v-for="item in newsOptions" :key="item.ID" :label="item.Title" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>


</template>

<script>
  import moment from 'moment'
  export default {
    name: 'ContestPage',
    data() {
      return {
        total: 1,
        dialogVisible: false,
        dialogVisible2: false,
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
      }
    },
    mounted() {
      this.searchContest()
      this.searchNews('')
      this.searchProcess('')
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
        }).then(()=> {
          this.$message({
            type: 'success',
            content: '发布成功'
          })
        })
      },
      toDetails(ID) {
        this.$router.push('/admin/contestdetails/'+ID)
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