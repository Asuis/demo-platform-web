<template>
  <div>
<el-breadcrumb style="margin-bottom:20px;" separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/process">流程配置</a></el-breadcrumb-item>
      <el-breadcrumb-item><a :href="`/edit/${this.$route.params.id}`">{{info.Name}}</a></el-breadcrumb-item>
    </el-breadcrumb>  
  <el-row>
    <el-col :span="6">
      <el-button type="primary">创建</el-button>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="ID" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.ID }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="流程名" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.Name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="开始实际">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.UpdatedUnix }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="结束时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.UpdatedUnix }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="权限">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.UpdatedUnix }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="创建时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.UpdatedUnix }}</el-tag>
          </div>
        </template>
      </el-table-column>
  </el-table>
  <el-dialog title="竞赛子流程创建" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form>
        <el-form-item label="流程名称" required>
          <el-input v-model="formInline.Name" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="流程描述">
          <el-input v-model="formInline.Desc" type="textarea" placeholder="竞赛名称"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;">
          </el-date-picker>
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
    data () {
      return {
        info: {},
        list: [],
        processForm: {
          Name: '',
          StartTime: '',
          EndTime: '',
          Role: [],
          Ex: ''
        },
      }
    },
    methods: {
      get() {
        const id = this.$route.params.id
        this.$store.dispatch('process/get', {id: id}).then(({data})=> {
          console.log(data)
          this.info = data
        })
      }
    }
}
</script>

<style>

</style>