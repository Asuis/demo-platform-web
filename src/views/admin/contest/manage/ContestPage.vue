<template>
    <div class="container">
        <div class="search-container">
            <el-select class="select"></el-select>
            <el-input prefix-icon="el-icon-search" class="search"></el-input>
            <el-button type="primary" class="create-btn">创建</el-button>
        </div>
        <el-row :gutter="20">
            <el-col :span="4" v-for="i in 10" :key="i">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image">
                    <div style="padding: 14px;">
                        <span>第2000届xx泵竞赛</span>
                        <div class="bottom clearfix">
                            <time class="time">时间：2019.10.20-2019.12.30{{ cureent }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination background layout="prev, pager, next" :total="total">
        </el-pagination>

        <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
          <el-card>
            <el-form>
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
</el-dialog>
        
    </div>

  
</template>

<script>
    export default {
        name: 'ContestPage',
        data() {
            return {
                total: 100,
                dialogVisible: false
            }
        }
    }
</script>

<style>
    .search-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 18px;
    }

    .select {}

    .search {
        margin-left: 20px;
        width: 200px;
    }

    .create-btn {
        margin-left: 18px;
    }

    .button {
        float: right;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
</style>