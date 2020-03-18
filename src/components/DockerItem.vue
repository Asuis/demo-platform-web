<template>
  <div>
      <el-card class="container">
          <el-row>
              <div>
                  ID<span style="overflow-x:hidden;">  {{ContainerID}} </span>
              </div>
          </el-row>
          <el-row style="margin-bottom:8px;">
          <div>
                 名称 {{Name}}
            </div>
            <div>
                 状态: {{Status}}
            </div>
          </el-row>
          <el-row :gutter="1">
              <el-col :span="12">
                  <el-button type="success" size="small">详情</el-button>
              </el-col>
              <el-col :span="12">
                  <el-button type="primary" size="small" >
                      <router-link :to="getUrl" style="color: #fff;">终端</router-link>
                    </el-button>
              </el-col>
          </el-row>
      </el-card>
      <el-dialog  title="容器详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
          <el-button type="success">运行</el-button>
          <el-button type="error">删除</el-button>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'DockerItem',
    props: {
        ID: String,
        Name: String,
        Status: String,
        ContainerID: String
    },
    data () {
        return {
            dialogVisible: false
        }
    },
    methods : {
        handleClose() {}
    },
    computed: {
        getUrl() {
            return `/terminal/${this.ContainerID}`
        }
    }
}
</script>

<style scope>
  .container{
     max-width: 240px;
     padding-left: 4px;
     padding-right: 4px;
     padding-top: 4px;
     padding-bottom: 0px;
     overflow-x: hidden;
  }
</style>