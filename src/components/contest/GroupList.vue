<template>
  <div>
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
    <el-table :data="tableData" stripe style="width: 100%" row-key="ID" border lazy :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="date" label="ID" width="180">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="团队" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.Name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="owner" label="所有者">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.OwnerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="UpdatedUnix" label="创建时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.UpdatedUnix }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit2(scope.row)">配置成员</el-button>
          <el-button size="small" type="text" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:center;margin-top:20px;" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 50, 100]" :page-size="100"
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


    <el-dialog title="团队" :visible.sync="dialogVisible2" width="40%">
      <el-form>
        <el-form-item label="团队名称" required>
          <el-input v-model="groupUpdForm.Name" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="团队描述">
          <el-input v-model="groupUpdForm.Description" type="textarea" placeholder="描述"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button style="float:right;" type="primary" @click="onSubmit2">保存</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog title="配置成员" :visible.sync="dialogVisible3" width="40%">
      <el-table :data="tableData" stripe style="width: 100%" row-key="ID" border lazy :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="date" label="ID" width="180">
        <template slot-scope="scope">
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="团队" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.Name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="owner" label="所有者">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.OwnerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="UpdatedUnix" label="创建时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.UpdatedUnix }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit2(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="edit(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'GroupList',
  data() {
    return {
      tableData: [],
      groupUpdForm: {},
      groupForm: {
          Name: '',
          Description: ''
        },
        processUpdForm: {
          Name: '',
          StartTime: '',
          EndTime: '',
          Role: [],
          UserIDs: [],
          Ex: '',
          PID: 0,
          ID: 0
        },
        userOptions: [],
        roleOptions: [{
            value: 0,
            label: '用户'
          },
          {
            value: 1,
            label: '学生'
          },
          {
            value: 2,
            label: '教师'
          },
          {
            value: 3,
            label: '审核者'
          },
          {
            value: 4,
            label: '管理员'
          }
        ],
        searchForm: {
          status: '',
          search: ''
        },
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        total: 100,
        query: {
          order: 'EndTime',
          pageSize: 10,
          page: 0,
        }
    
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    handleClose() {
        this.dialogVisible = false

      },
      handleOpen() {
        this.dialogVisible = true
      },
      onSubmit() {
        this.$store.dispatch('group/create', this.groupForm).then(()=> {
          this.$message({
            type: 'success'
          })
        })
      },
      list() {
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
      onSubmit2() {
         this.$store.dispatch('group/update', this.groupUpdForm).then(()=> {
          this.$message({
            type: 'success'
          })
        })
      },
      edit(e) {
        console.log(e)
        this.groupUpdForm = e
        this.dialogVisible2 = true
      },
      onSubmit3(e) {
        console.log(e)
      },
      configUsers() {
        this.dialogVisible3 = true
        this.groupUpdForm = {
          UserIDs: []
        }
      },
      searchUsers(q) {
        this.$store.dispatch('user/list', {
          ...this.groupUpdForm,
          LoginName: q
        }).then(({data})=> {
          console.log(data)
          this.$message({
            type: 'success'
          })
        })
      },
      edit2() {
        this.dialogVisible3 = true
      },
      handleSizeChange() {},
      handleCurrentChange() {},
      load() {}
  }
}
</script>

<style scoped>
  .search-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 18px;
    flex-direction: row;
  }

  .search {
    width: 400px;
    margin-right: 18px;

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

  .select {
    margin-right: 18px;
  }
</style>