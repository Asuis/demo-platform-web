<template>
  <div class="container3">
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">我的项目展示</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-container">
      <!-- <el-select placeholder="状态" v-model="searchForm.status" class="select">
        <el-option label="进行中" value="1"></el-option>
        <el-option label="已结束" value="beijing"></el-option>
        <el-option label="未发布" value="beijing"></el-option>
      </el-select> -->
      <el-input prefix-icon="el-icon-search" class="search" v-model="searchForm.search"></el-input>
      <el-button type="primary" class="search-btn" @click="handleOpen" icon="el-icon-search">查询</el-button>
      <el-button type="primary" class="create-btn" @click="dialogVisible2 = true">创建</el-button>
    </div>
    <el-row class="container5" type="flex" :gutter="20">
      <el-col class="item" :span="6" v-for="i in list" :key="i.ID">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://res.mengxiangjing.com/ChobeChick_ZH-CN9997116812.jpg" class="image">
          <div style="padding: 14px;">
            <div>
              项目名称：{{i.Name}}
            </div>
            <span>
              {{i.Desc}}<br>
            </span>
            <div>
              状态：{{formatStatus(i.Status)}}
            </div>
            <span>
              展示地址：centos
            </span>
            <div class="bottom clearfix">
              <div style="margin-bottom:12px;">{{i.Desc}}</div>
            </div>
            <div style="float:right;">
              <el-button size="small">配置</el-button>
              <el-dropdown style="margin-left:10px;" size="small">
                <el-button size="small">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>销毁</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div style="clear:both;"></div>
          </div>
        </el-card>
      </el-col>

    </el-row>
    <el-pagination style="text-align:center;margin-top:20px;" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="payload.page" :page-size="payload.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog :title="`展示项目创建`" :visible.sync="dialogVisible2" width="40%">
      <el-form>
        <el-form-item label="项目名称" required>
          <el-input v-model="containerForm.Name" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="容器" required>
          <el-select v-model="containerForm.ImageName" placeholder="请选择容器">
            <el-option v-for="item in imageOptions" :key="item.ID" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="CPU核数" required>
          <el-select v-model="signUpForm.groupID" placeholder="请选择CPU核数">
            <el-option v-for="item in imageOptions" :key="item.ID" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存大小" required>
          <el-select v-model="signUpForm.groupID" placeholder="请选择镜像">
            <el-option v-for="item in imageOptions" :key="item.ID" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button style="float:right;" type="primary" @click="handleCreateDisplay">创建</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'MyDisplayView',
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
      handleCreateDisplay() {
        this.$store.dispatch('display/create', this.containerForm).then(({
          data
        }) => {
          console.log(data)
          this.$message({
            type: 'success'
          })
          this.listContainer()

        })
      },
      listContainer() {
        this.$store.dispatch('display/list', this.payload).then(({
          data
        }) => {
          console.log(data)
          this.list = data.Data
          this.total = data.Total
        })
      },
      handleOpen() {
        this.dialogVisible = true
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      openTerminal(id) {
        window.open('/terminal/' + id)
      },
      run(id) {
        this.$store.dispatch('container/run', {
          cloud_id: id
        }).then(({
          data
        }) => {
          console.log(data)
          this.$message({
            type: 'success',
            message: '启动成功'
          })
        })
      },
      stat(id) {
        this.$store.dispatch('container/stat', {
          cloud_id: id
        }).then(({
          data
        }) => {
          console.log(data)
        })
      },
      formatStatus(status) {
        if (status === 0) {
          return "运行中"
        } else if (status === 2) {
          return "停止"
        } else if(status === 3) {
          return "构建中"
        }else if(status === 4) {
          return "构建成功"
        }else if(status === 1) {
          return "停止中"
        }else if(status === 5) {
          return "构建失败"
        }
      }
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