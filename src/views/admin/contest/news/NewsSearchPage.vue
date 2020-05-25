<template>
  <div>
    <el-breadcrumb style="margin-bottom:20px;" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/news">公告配置</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-container" style="margin-bottom:20px;">
    <el-input  v-model="query.Title" class="search" placeholder="标题搜索"></el-input>

        <el-button type="primary" class="create-btn" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button type="primary" class="create-btn" @click="toCreate(0)">创建</el-button>

    </div>

    <el-table class="table" :data="list" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="540">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" @click="goDetails(scope.row.ID)">{{ scope.row.Title }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="置顶" width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Top }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="240">
        <template slot-scope="scope">

          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ format(scope.row.UpdatedUnix) }}</el-tag>
          </div>

        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="toEdit(scope.row.ID)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;text-align:center;" background layout="prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'NewsSearchPage',
    data() {
      return {
        query: {
          order: 'ID',
          pageSize: 10,
          page: 0,
          Title: ''
        },
        list: [],
        total: 0
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        this.$store.dispatch('news/list', this.query).then(({
          data
        }) => {
          console.log(data)
          this.list = data.Data
          this.total = data.Total
        })
      },
      format(unix) {
        moment.locale()
        console.log(unix)
        return moment.unix(unix).format("dddd, MMMM Do YYYY, h:mm:ss a")
      },
      toCreate() {
        this.$router.push('/admin/news/edit/0')
      },
      toEdit(id) {
        this.$router.push(`/admin/news/edit/${id}`)
      }
    }
  }
</script>
<style scoped>
.search-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 18px;
    }
    .search {
        width: 400px;
    }

    .create-btn {
        margin-left: 18px;
    }
  .text {
    width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 20px;
    text-decoration: none;
    color: #000;
    font-weight: 600;
  }

  .text-detail {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .text>a {
    color: black;
  }

  .news-card {
    width: 600px;
  }
</style>