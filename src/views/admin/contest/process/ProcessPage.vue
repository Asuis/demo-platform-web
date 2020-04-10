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
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="流程名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    <el-dialog title="竞赛流程创建" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form>
        <el-form-item label="竞赛名称" required>
          <el-input v-model="formInline.Name" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="竞赛描述">
          <el-input v-model="formInline.Desc" type="textarea" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="报名开始时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="报名结束时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="流程" required>
          <el-select v-model="formInline.value" placeholder="选择流程">
            <el-option label="传统流程" value="1"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告关联" required>
          <el-select v-model="formInline.value" placeholder="选择公告">
            <el-option label="传统流程" value="1"></el-option>
            <el-option label="流程2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ProcessEditPage',
    data() {
      return {
        searchForm: {
          status: '',
          search: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      onSubmit() {

      },
      handleClose() {
        this.dialogVisible = false

      },
      handleOpen() {
        this.dialogVisible = true
      }
    },
  }
</script>

<style>

</style>